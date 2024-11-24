import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Login = async(req, res) => {
    try{
        
        const user = await UserModel.findOne({email: req.body.email})

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
            'secretMax392',
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
            message: 'авторизация не пройдена'
        })
    }
} 

export const Register = async(req, res) => {
    try{

        const checkUser = await UserModel.findOne({fullName: req.body.fullName})

        if(checkUser){
            return res.status(404).json({
                message: 'имя занято'
            })
        }
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        
        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            role: req.body.role,
            passwordHash: hash
        })
    
        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretMax392',
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
        res.status(500).json({
            message: 'не удалось зарегистрироваться'
        })
    }
}

export const getMe = async (req, res) => {
    try {
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

        const user = await userModel.findOne({_id: userID}).exec()

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