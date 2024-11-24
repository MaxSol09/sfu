import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validations/AuthValidators.js'
import multer from 'multer'
import checkAuth from './utils/checkAuth.js'
import { Answer, Create, createComment, Delete, GetAllQuestions, getTags, removeComment } from './controllers/QuestionsController.js'
import { createLink, getMe, getUser, Login, Register } from './controllers/userController.js'
import { linkValidation } from './validations/LinkValidators.js'
import { validationErrors } from './validations/ErorrsValidation.js'
import { themeValidation } from './validations/ThemeValidation.js'


mongoose.connect(
    'mongodb+srv://maksimsologor03:55555.@sfudb.vteuu.mongodb.net/',
).then(() => {
    console.log('MongoDB connect')
}).catch((err) => {
    console.log('error connection data base > ')
})


const app = express()

app.use(express.json())
app.use(cors())


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
        path: `http://localhost:4444/upload/${req.file.originalname}`
    })
})

app.post('/auth/register', registerValidation, validationErrors, Register)
app.post('/auth/login', loginValidation, validationErrors, Login)
app.get('/auth/me', checkAuth, getMe)

app.get('/user/:id', checkAuth, getUser)

app.post('/link', linkValidation, validationErrors, createLink)

app.get('/tags', getTags)

app.post('/question/create', themeValidation, validationErrors, Create)
app.post('/theme/delete', Delete)
app.get('/questions', GetAllQuestions)

app.post('/create/comment', createComment)
app.post('/delete/comment', removeComment)
app.post('/answer', Answer)


app.listen(4444, (err) => {
    if(err){
        return console.error(err)
    }

    console.log('сервер стартанул')
})


// я старался :)
//надеюсь выиграю
//возьмите меня в odggetto плиз, хотя бы на экскурсию))