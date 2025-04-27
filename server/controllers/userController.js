import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { WebSocket } from 'ws'
import { clientsMap, wss } from '../index.js'

export const Login = async(req, res) => {
    console.log(req.body)
    try{
        
        const user = await UserModel.findOne({ email: req.body.email }).catch(dbError => {
            console.error("Ошибка поиска пользователя:", dbError); // Логируем ошибку базы данных
            throw new Error('Ошибка при обращении к базе данных'); // Бросаем ошибку, чтобы поймать ее в catch
        });

        console.log(user)

        if(!user){
            return res.status(404).json({
                message: 'неверный email'
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!validPassword){
            return res.status(404).json({
                message: 'пароль неверный'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.SECRET_TOKEN,
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...result} = user._doc


        res.json({
            ...result,
            token
        })
    }
    catch(error){
        return res.status(500).json({
            message: 'авторизация не пройдена',
            err: error.message
        })
    }
} 

export const Register = async(req, res) => {
    console.log(req.body);
    try{

        // Check if email exists (more reliable than fullName)
        const checkUser = await UserModel.findOne({email: req.body.email}); // Changed to email

        if(checkUser){
            return res.status(400).json({ // Changed status to 400 Bad Request
                message: 'email уже занят' // Changed message
            });
        }

        // Validate required fields
        if (!req.body.fullName || !req.body.email || !req.body.role) {
            return res.status(400).json({ message: 'Необходимо заполнить все обязательные поля' });
        }

        if(req.body.role === 'Админ' && req.body.password.length < 6) {
            return res.status(500).json({
                message: 'ошибка валидации'
            })
        }

        let user; // Declare user variable outside the if/else block

        if(req.body.speciality){
            // Create student user
            const student = new UserModel({
                fullName: req.body.fullName,
                email: req.body.email,
                role: req.body.role,
                speciality: req.body.speciality
            });

            user = await student.save();

        }
        else if(req.body.role = 'Админ'){
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const admin = new UserModel({
                fullName: req.body.fullName,
                email: req.body.email,
                role: req.body.role, 
                passwordHash: hash
            });

            user = await admin.save();
        }
        else{
            // Create regular user
            const doc = new UserModel({
                fullName: req.body.fullName,
                email: req.body.email,
                role: req.body.role
            });

            user = await doc.save();
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.SECRET_TOKEN,
            {
                expiresIn: '30d'
            }
        );

        // Moved WebSocket logic here, after successful registration
        wss.clients.forEach(client => {
            clientsMap.forEach(registeredUser => { // Renamed 'user' to 'registeredUser'
                if (registeredUser.role === 'admin' && registeredUser.ws === client && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({type: 'registerUser', data: {...result, token}}));
                }
            });
        });

        console.log('reg', user._doc)

        res.json({
            ...user._doc,
            token
        });

    }
    catch(error){
        console.error("Error in Register:", error); // Log the error
        res.status(500).json({
            message: 'не удалось зарегистрироваться',
            error: error.message // Include error message in response
        });
    }
};


export const getMe = async (req, res) => {
    try {

        console.log(req.body)
        const user = await UserModel.findById(req.userId);

        if (!user) {
            throw new Error('User not found');
        }

        const { passwordHash, ...result } = user._doc;


        return res.json({
            ...result
        });
    } catch(err){
        res.status(404).json({
            msg: 'ошибка при получении'
        })
    }
}

export const getAllUsers = async(req, res) => {
    try{
        const users = await UserModel.find()

        if(users){
            return res.json(users.reverse())
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'не удалось получить всех пользователей'
        })
    }
}

export const createLink = async(req, res) => {
    try{
        const user = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                link: req.body.link
            },
            {
                returnDocument: 'after'
            }
        )

        if(!user){
            res.status(500).json({
                message: 'не получилось добавить ссылку в профиль'
            })
        }


        return res.json(user)
    }
    catch(error){
        return res.status(500).json({
            message: 'ошибка при добавлении ссылки в профиль'
        })
    }
}


export const getUser = async(req, res) => {
    try{
        const userID = req.params.id

        const user = await UserModel.findOne({_id: userID}).populate({
            path: 'complaints',
            populate: [
                { path: 'auther', model: 'User' },
                { path: 'user', model: 'User' }
            ]
        }).exec()

        if(!user){
            return res.status(404).json({
                message: 'пользователь не найден'
            })
        }

        return res.json(user)
    }
    catch(err){
        res.status(500).json({
            message: 'ошибка при получении пользователя'
        })
    }
}

export const avatarUser = async (req, res) => {
    try{
        const changeAvatar = await UserModel.findByIdAndUpdate(
            req.body.id,
            { avatarUrl: req.body.avatar},
            { new: true }
          );
        
        res.json(changeAvatar)
    }
    catch(err){
        res.status(404).json({
            msg: 'ошибка при смене аватарки'
        })
    }
}

export const backgroundUser = async (req, res) => {
    try{
        const changeBackground = await UserModel.findByIdAndUpdate(
            req.body.id,
            {backgroundProfile: req.body.backgroundProfile},
            { new: true }
          );
        
        res.json(changeBackground)
    }
    catch(err){
        res.status(404).json({
            msg: 'ошибка при смене аватарки'
        })
    }
}


export const changeText = async (req, res) => {
    console.log(req.body)

    try{
        if(!req.body.text || !req.body.userID || req.body.text.length > 300){
            res.status(400).json({
                message: 'поля для запроса не указаны'
            })
        }

        const user = await UserModel.findByIdAndUpdate(
            req.body.userID,
            {text: req.body.text},
            {new: true}
        )

        if(!user){
            res.status(404).json({
                message: 'ползователь не найден'
            })
        }


        res.json(user)

    }
    catch(err){
        res.status(500).json({
            message: 'не получилось редактировать текст'
        })
    }
}


export const deleteUser = async(req, res) => {
    try{

        const result = await UserModel.findByIdAndDelete({
            _id: req.body.userID
        }, 
        {
            returnDocument: 'after'
        })

        if(!result){
            return res.json({
                message: 'ошибка при удалении'
            })
        }

        wss.clients.forEach(client => {
            clientsMap.forEach(user => {
                if ((user.role === 'admin' || user.id === req.body.userID) && user.ws === client && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({type: 'deleteUser', data: result}))
                }
            });
        });

        return res.json(result)
    }
    catch(err) {
        return res.status(500).json({
            message: 'нет разрешения'
        })
    }
}

export const banUser = async(req, res) => {
    console.log(req.body)
    try {
        if (!req.body.type || !req.body.userID) {
            return res.status(400).json({ message: 'Не указаны данные' });
        }

        let ban;

        if (req.body.type === 'ban') {
            ban = await UserModel.findByIdAndUpdate(
                req.body.userID,
                {
                    ban: true,
                    banText: req.body.text
                },
                { new: true }
            );

        } else {
            ban = await UserModel.findByIdAndUpdate(
                req.body.userID,
                {
                    ban: false,
                    banText: ''
                },
                { new: true }
            );
        }

        if (!ban) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }


        wss.clients.forEach(client => {
            clientsMap.forEach(user => {
                if ((user.role === 'admin' || user.id === req.body.userID) && user.ws === client && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({ type: 'ban', data: ban }));
                }
            });
        });

        return res.json(ban);
    } 
    catch(err){
        return res.status(501).json({
            message: 'не удалось заблокировать пользователя ',
            error: err
        })
    }
}


export const userRole = async(req, res) => {
    try{

        if(!req.body.speciality || !req.body.userID){
            return res.status(500).json({
                message: 'не указаны данные'
            })
        }

        const user = await UserModel.findByIdAndUpdate(req.body.userID, {
            speciality: req.body.speciality
        }, {new: true})

        return res.json(user)

    }
    catch(err){
        return res.status(500).json({
            message: 'не получилось дать пользователю специальность'
        })
    }
}

export const createComplaint = async(req, res) => {
    try{
        if(!req.body.text | !req.body.userID | req.body.autherID){
            return res.status(500).json({
                message: 'не указаны нужные данные'
            })
        }

        const complaint = {user: req.body.userID, auther: req.body.autherID, text: req.body.text, date: new Date()}

        const user = await UserModel.findByIdAndUpdate(req.body.userID, 
            {'$push': {complaints: {}}},
            {new: true}
        ).populate({
            path: 'complaints',
            populate: [
                { path: 'auther', model: 'User' },
                { path: 'user', model: 'User' }
            ]
        })

        if(!user){
            res.status(500).json({
                message: 'ошибка в создании жалобы'
            })
        }

        wss.clients.forEach(client => {
            clientsMap.forEach(user => {
                if (user.role === 'admin' && user.ws === client && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({ type: 'createComplaint', data: complaint }));
                }
            });
        });


        return res.json(user)
    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            message: 'ошибка при создании жалобы'
        })
    }
}

export const getAllComplaints = async(req, res) => {
    try{
        const users = await UserModel.find().populate({
            path: 'complaints',
            populate: [
                { path: 'auther', model: 'User' },
                { path: 'user', model: 'User' }
            ]
        })

        const complaints = users.flatMap(el => el.complaints)

        const result = complaints.sort((a, b) => {
            let c = new Date(a.date).getTime();
            let d = new Date(b.date).getTime();
            return d-c;
        })
        
        return res.json(result)
    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            message: 'не получилось поулчить все жалобы'
        })
    }
}

export const deleteComplaint = async(req, res) => {
    try{
        const deleteComplaint = await UserModel.findByIdAndUpdate(req.body.userID, {
            '$pull': {'complaints': {auther: req.body.autherID}}
        }, {new: true})

        if(!deleteComplaint){
            res.status(404).json({message: 'не найденно'})
        }

        return res.json(req.body)

    }
    catch(err){
        console.log('error >>> ', err)
        res.status(500).json({
            message: 'ошибка при удалении жалобы'
        })
    }
}


export const sendMsgSupport = async (req, res) => {
    try {
        // Проверка наличия текста сообщения
        if (!req.body.text) {
            return res.status(400).json({
                message: 'данные не коректны'
            });
        }

        // Поиск пользователя по userID
        const user = await UserModel.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        let msg;

        // Проверка статуса и создание сообщения
        if (req.body.status === 'admin') {
            msg = {
                text: req.body.text,
                status: 'admin',
                date: new Date()
            };
        } else {
            msg = {
                text: req.body.text,
                status: 'user',
                fullName: req.body.fullName,
                date: new Date()
            };
        }

        // Обновление пользователя и добавление сообщения в чат
        const send = await UserModel.findByIdAndUpdate(
            req.body.userID,
            {
                $push: { 'chat': msg }
            },
            { new: true }
        );

        if(req.body.status === 'user'){
            await UserModel.findByIdAndUpdate(req.body.userID, {
                lastChat: send.chat
            }, {new: true})
        }

        wss.clients.forEach(client => {
            clientsMap.forEach(user => {
                console.log(user)
                if ((user.role === 'admin' || user.id === req.body.userID) && user.ws === client && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({type: 'chat', data: send}))
                }
            });
        });

        return res.json(send);

    } catch (err) {
        // Подробная информация об ошибке
        return res.status(500).json({
            message: 'ошибка при послании сообщения в поддержку',
        });
    }
}

export const changeLastChat = async(req, res) => {

    try{

        const adminMessages = req.body.chat.filter(el => el.status === 'admin')

        const user = await UserModel.findByIdAndUpdate(req.body.userID, {
            lastChat: adminMessages
        }, {new: true})

        if(!user){
            res.status(404).json({
                message: 'ошибка смены последнего чата'
            })
        }   

        res.json(user)

    }
    catch(err){
        console.log('error >>> ', err)

        res.status(500).json({
            message: 'ошибка смены последнего чата'
        })
    }
}