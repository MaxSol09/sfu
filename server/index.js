import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validations/AuthValidators.js'
import multer from 'multer'
import checkAuth from './utils/checkAuth.js'
import { linkValidation } from './validations/LinkValidators.js'
import { validationErrors } from './validations/ErorrsValidation.js'
import { questionValidation } from './validations/QuestionValidation.js'
import { WebSocketServer } from 'ws'
import { configDotenv } from 'dotenv'
import UserModel from './models/UserModel.js'
import jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import { QuestionsController, userController } from './controllers/index.js'

configDotenv()

mongoose.connect(
    process.env.DATA_BASE,
).then(() => {
    console.log('MongoDB connect')
}).catch((err) => {
    console.log('error connection data base > ')
})

export const wss = new WebSocketServer({port: 8080})

export let clientsMap = []


wss.on('connection', (ws, req) => {

    const urlString = req.url;

    const userId = urlString.substring(9, urlString.indexOf('/?role'));
    const role = urlString.substring(urlString.indexOf('/?role=') + 7, urlString.length);

    console.log(role);

    const checkUser = clientsMap.find(el => el.id === userId);

    if (checkUser === undefined) {
        clientsMap.push({ id: userId, ws: ws, role: role });
    }

    console.log(clientsMap.length);

    ws.on('close', () => {
        clientsMap = clientsMap.filter(client => client.ws !== ws); // Исправлено: сохраняем результат фильтрации
        console.log(`Client disconnected. Remaining clients: ${clientsMap.length}`);
    });

    ws.on('error', error => {
        console.error(`WebSocket error: ${error}`);
    });

});


const app = express()

const corsConfig = {
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://sfu-86v5.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(express.json())

app.use(cors(corsConfig))
app.options("", cors(corsConfig))

app.use('/upload', express.static('images'))

const storage = multer.diskStorage(
    {
        destination: (_, __, cb) => {
            cb(null, 'images')
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage})

app.post('/upload', checkAuth, upload.single('file'), (req, res) => {
    res.json({
        url: req.file.originalname,
        path: `https://sfu-server-yx7u.onrender.com/upload/${req.file.originalname}`
    })
})


app.post('/microsoft/login', async (req, res) => {
    try{
        const {email} = req.body

        console.log(req.body)
        
        const user = await UserModel.findOne({email: email})

        if(!user){ 
            res.status(404).json({
                message: 'нет такого пользователя'
            })
        }

        if(user.role !== 'Студент') {
            res.status(500).json({
                message: 'Нет доступа, так как вы не студент'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretMax392',
            {
                expiresIn: '30d'
            }
        )

        res.json({
            ...user._doc,
            token
        })
    }
    catch(err) {
        res.status(500).json({
            message: 'ошибка при входе в аккаунт',
            error: err
        })
    }
})

app.post('/vk/login', async (req, res) => {
    try{
        const user = await UserModel.findOne({vkid: req.body.vkid})

        if(!user){
            res.status(404).json({
                message: 'данные о вас не найденны'
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

        res.json({token: token, ...user._doc})
    }
    catch(err){
        res.status(500).json({
            message: 'ошибка при входе через вк'
        })
    }
})

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'maksimsologor@gmail.com',
        pass: 'qvdxyxwfbukpngsw'
    }
})

export function sendMail(to, sub, msg){
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.post('/microsoft/register', async(req, res) => {
    try{
        const {email, fullName, role} = req.body

        const findUser = await UserModel.findOne({email: email})

        if(findUser) {
            res.status(500).json({
                message: 'пользователь с таким email уже зарегистрирован'
            })
        }

        const user = new UserModel({
            email: email, 
            fullName: fullName,
            role: role
        })

        await user.save()

        if(!user){
            res.status(500).json({
                message: 'не получилось создать пользователя'
            })
        }

        const tokenUser = jwt.sign(
            {
                _id: user._id
            },
            'secretMax392',
            {
                expiresIn: '30d'
            }
        )

        return res.json({...user._doc, token: tokenUser}); // Отправляем JSON

    }
    catch(err){
        res.status(500).json({
            message: 'ошибка при регистрации пользователя через microsoft',
            error: err
        })
    }
})

app.post('/vk/user', async (req, res) => {
    try {
        const { vkID, token, email } = req.body;

        console.log(req.body)

        const checkUser = await UserModel.findOne({vkid: vkID})

        if(checkUser){
            return res.status(500).json({
                message: 'такой пользователь уже зарегистрирован'
            })
        }

        console.log('wvbwbqvboobwv')
        
        const data = await fetch(`https://api.vk.com/method/users.get?user_id=${vkID}&fields=bdate,city,music,sex&access_token=${token}&v=5.199`);

        console.log(data)

        if (!data.ok) {
            console.error(`VK API error: ${data.status} ${data.statusText}`);
            return res.status(data.status).json({
                message: `VK API error: ${data.status} ${data.statusText}`,
            });
        }

        const jsonData = await data.json();


        if (jsonData.error) {
            console.error('VK API error:', jsonData.error);
            return res.status(500).json({
                message: 'VK API error',
                vkError: jsonData.error,
            });
        }

        const firstName = jsonData.response[0].first_name;

        const fullName = `${firstName}`;

        const user = new UserModel({
            fullName: fullName,  // Используем объединенное имя
            email: email,
            role: 'Абитуриент',
            vkid: vkID
        })

        await user.save()

        if(!user){
            res.status(500).json({
                message: 'ошибка при регистрации'
            })
        }

        const tokenUser = jwt.sign(
            {
                _id: user._id
            },
            process.env.SECRET_TOKEN,
            {
                expiresIn: '30d'
            }
        )

        return res.json({...user._doc, token: tokenUser}); // Отправляем JSON
    } catch (err) {
        console.error('Error fetching VK user:', err);
        res.status(500).json({
            message: 'Error fetching VK user',
            error: err.message,
        });
    }
});

app.post('/auth/register', registerValidation, validationErrors, userController.Register)
app.post('/auth/login', loginValidation, validationErrors, userController.Login)
app.get('/auth/me', checkAuth, userController.getMe)

app.get('/question/:id', QuestionsController.getOne)

app.post('/user/img', checkAuth, userController.avatarUser)
app.post('/user/background', checkAuth, userController.backgroundUser)
app.post('/user/text', checkAuth, userController.changeText)
app.get('/user/:id', checkAuth, userController.getUser)

app.get('/complaints', checkAuth, userController.getAllComplaints)
app.post('/complaint/create', checkAuth, userController.createComplaint)
app.post('/complaint/delete', checkAuth, userController.deleteComplaint)

app.get('/users', checkAuth, userController.getAllUsers)
app.post('/user/delete', checkAuth, userController.deleteUser)
app.post('/user/ban', checkAuth, userController.banUser)
app.post('/user/speciality', checkAuth, userController.userSpeciality)
app.post('/user/role', checkAuth, userController.userRole)

app.post('/send/message', checkAuth, userController.sendMsgSupport)

app.post('/link', linkValidation, validationErrors, userController.createLink) //пока что создано тестово. Идея заключается в том, чтобы пользователь мог добавлять ссылки в свой профиль

app.get('/tags', QuestionsController.getTags)

app.post('/question/create', checkAuth, questionValidation, validationErrors, QuestionsController.Create)
app.post('/question/moderation', checkAuth, QuestionsController.ModerationQuestion)
app.post('/question/delete', checkAuth, QuestionsController.Delete)
app.get('/questions', QuestionsController.GetAllQuestions)
app.post('/question/like', checkAuth, QuestionsController.CreateLike)

app.post('/create/comment', checkAuth, QuestionsController.createComment)
app.delete('/delete/comment', QuestionsController.removeComment) //пока что не используется

app.post('/change/lastchat', checkAuth, userController.changeLastChat)

app.listen(process.env.PORT || 4444, (err) => {
    if(err){
        return console.error(err)
    }

    console.log('сервер стартанул')
})


// я старался :)
//надеюсь выиграю
//возьмите меня в odggetto плиз, хотя бы на экскурсию))

//АХАХАХАА, я это писал когда сервак делал 