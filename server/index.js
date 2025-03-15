import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validations/AuthValidators.js'
import multer from 'multer'
import checkAuth from './utils/checkAuth.js'
import { Create, createComment, CreateLike, Delete, GetAllQuestions, getOne, getTags, ModerationQuestion, removeComment } from './controllers/QuestionsController.js'
import { avatarUser, backgroundUser, banUser, changeLastChat, changeText, createComplaint, createLink, deleteComplaint, deleteUser, getAllComplaints, getAllUsers, getMe, getUser, Login, Register, sendMsgSupport, userRole } from './controllers/userController.js'
import { linkValidation } from './validations/LinkValidators.js'
import { validationErrors } from './validations/ErorrsValidation.js'
import { questionValidation } from './validations/QuestionValidation.js'
import { WebSocketServer } from 'ws'
import { configDotenv } from 'dotenv'
import UserModel from './models/UserModel.js'
import jwt from 'jsonwebtoken'

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
    origin: ['https://sfu-counselor.onrender.com', 'http://localhost:3000', 'http://localhost:5173'],
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
        path: `http://sfu-1.onrender.com/upload/${req.file.originalname}`
    })
})

app.post('/vk/user', async (req, res) => {
    try {
        const { vkID, token, email } = req.body;

        const checkUser = await UserModel.findById(vkID)

        if(checkUser){
            return res.status(500).json({
                message: 'такой пользователь уже зарегистрирован'
            })
        }
        
        const data = await fetch(`https://api.vk.com/method/users.get?user_id=${vkID}&fields=bdate,city,music,sex&access_token=${token}&v=5.199`);

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
            _id: vkID
        })

        await user.save()

        if(!user){
            res.status(500).json({
                message: 'ошибка при регистрации'
            })
        }

        const tokenUser = jwt.sign(
            {
                _id: vkID
            },
            'secretMax392',
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

app.post('/auth/register', registerValidation, validationErrors, Register)
app.post('/auth/login', loginValidation, validationErrors, Login)
app.get('/auth/me', checkAuth, getMe)

app.get('/question/:id', checkAuth, getOne)

app.post('/user/img', checkAuth, avatarUser)
app.post('/user/background', checkAuth, backgroundUser)
app.post('/user/text', checkAuth, changeText)
app.get('/user/:id', checkAuth, getUser)

app.get('/complaints', checkAuth, getAllComplaints)
app.post('/complaint/create', checkAuth, createComplaint)
app.post('/complaint/delete', checkAuth, deleteComplaint)

app.get('/users', checkAuth, getAllUsers)
app.post('/user/delete', checkAuth, deleteUser)
app.post('/user/ban', checkAuth, banUser)
app.post('/user/speciality', checkAuth, userRole)

app.post('/send/message', checkAuth, sendMsgSupport)

app.post('/link', linkValidation, validationErrors, createLink) //пока что создано тестово. Идея заключается в том, чтобы пользователь мог добавлять ссылки в свой профиль

app.get('/tags', checkAuth, getTags)

app.post('/question/create', checkAuth, questionValidation, validationErrors, Create)
app.post('/question/moderation', checkAuth, ModerationQuestion)
app.post('/question/delete', checkAuth, Delete)
app.get('/questions', checkAuth, GetAllQuestions)
app.post('/question/like', checkAuth, CreateLike)

app.post('/create/comment', checkAuth, createComment)
app.delete('/delete/comment', removeComment) //пока что не используется

app.post('/change/lastchat', checkAuth, changeLastChat)

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