import QuestionModel from "../models/QuestionModel.js"
import UserModel from "../models/UserModel.js"
import { flattenArray } from "../utils/flatten.js"
import { removeDuplicates } from "../utils/sort.js"


export const Create = async(req, res) => {
    try{

        const doc = new QuestionModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.body.userId
        })

        await doc.save()
        

        return res.json(doc)
    }
    catch(err){
        return res.status(500).json({
            message: 'Тема не опубликовался'
        })
    }
}

export const Delete = async(req, res) => {
    try{
        const postId = req.body.id

        const doc = await QuestionModel.findByIdAndDelete(
            {
                _id: postId
            }, 
            {
                returnDocument: 'after'
            }
    )


    if(!doc) {
        return res.status(404).json({
            message: 'тема не удаленна'
        })
    }

        return res.json(postId)
    }
    catch(err){
        return res.status(500).json({
            message: 'Ошибка при удалении этой статьи'
        })
    }
}

export const GetAllQuestions = async(req, res) => {
    try{
        const posts = await QuestionModel.find().populate({path: 'user', select: ['fullName', 'avatarUrl']}).exec()

        res.json(posts.reverse())
    }
    catch(err){
        res.status(500).json({
            message: 'не удалось получить посты'
        })
    }
}

export const getTags = async(req, res) => {
    try{
        const posts = await QuestionModel.find()

        const result = posts.map(item => item.tags) 
        const flattenArr = flattenArray(result) //flattenArray служит для того чтобы массивы в массиве обьединить в один
        const filterTags = removeDuplicates(flattenArr) //removeDuplicates служит для удаления дубликатов из массивов и вывода самыъ 3 популярных значения

        res.json(filterTags)
    }
    catch(err){
        res.status(500).json({
            message: 'не удалось получить посты'
        })
    }
}

export const Answer = async(req, res) => {
    try{
        const question = await QuestionModel.findByIdAndUpdate(
            req.body.postId,
            {$set: {'comments.$[elem].answer': true}},
            {arrayFilters: [{"elem.id": req.body.id}]}
        )

        const doc = await UserModel.findByIdAndUpdate(            
            req.body.userId,
            {$inc: {numberResponse: 1}},
            { new: true }
        )

        if(!question | !doc){
            console.log(question)
            console.log(doc)

            return res.status(500).json({
                message: 'не получилось выбрать самый полезный коммент'
            })
        }

        return res.json(question)
    }
    catch(error){
        return res.status(500).json({
            message: 'ошибка при подтверждении ответа'
        })
    }
}


export const createComment = async (req, res) => {
    try{

        if(!req.body.fullName || !req.body.text){
            return res.status(404).json({
                message: 'не коректный запрос'
            })
        }

        const comment = await QuestionModel.findByIdAndUpdate(
            req.body.postId,
            {$push: {'comments': {
                text: req.body.text, 
                fullName: req.body.fullName, 
                userID: req.body.userId,
                avatarUrl: req.body.avatar, 
                commentId: req.body.commentId,
                answer: false
            }
            }}, 
            {new: true}
        )

        if (!comment) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        return res.json(comment)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'ошибка в создание комментария '
        })
    }
}

export const removeComment = async (req, res) => {
    try {
        if (!req.body.postId || !req.body.commentId) {
            return res.status(400).json({ message: 'postId и commentId обязательны' });
        }

        const comment = await QuestionModel.findByIdAndUpdate(
            req.body.postId,
            { $pull: { comments: { commentId: req.body.commentId }}},
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: 'Комментарий не найден или не удален' });
        }

        return res.json(
            {id: req.body.commentId}
        );
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'ошибка в удалении комментария' })
    }
}

