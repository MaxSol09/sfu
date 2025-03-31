import QuestionModel from "../models/QuestionModel.js"
import UserModel from "../models/UserModel.js"
import { flattenArray } from "../utils/flatten.js"
import { removeDuplicates } from "../utils/sort.js"
import { clientsMap, sendMail, wss } from "../index.js"


export const ModerationQuestion = async(req, res) => {
    try{
        if(!req.body.postId){
            res.status(500).json({
                message: 'данные не указаны'
            })
        }

        const users = await UserModel.find()

        if(req.body.moderation === true){
            const post = await QuestionModel.findByIdAndUpdate(
                req.body.postId, 
                {moderation: req.body.moderation},
                {new: true}
            ).populate({ path: 'user'});

            console.log(post.tags[0].toLowerCase())

            wss.clients.forEach(client => {
                clientsMap.map(user => {
                    if((user.role === 'admin' || user.role === 'student') && client.readyState === WebSocket.OPEN){
                        console.log('nice')
                        client.send(JSON.stringify({type: 'moderationQuestion', data: post}))
                    }

                    return user
                })
            })    

            return res.json(post)
        }
        else{
            const deletePost = await QuestionModel.findByIdAndDelete(
                req.body.postId
            )

            return res.json(deletePost)
        }


    }
    catch(err){
        res.status(500).json({
            message: 'ошибка при модерации',
            err: err
        })
    }
}


export const Create = async(req, res) => {
    try{

        //QuestionModel.collection.dropIndex('text_1')

        const doc = new QuestionModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.body.userId
        });

        await doc.save();

        // Здесь мы сначала сохраняем документ, а затем извлекаем его с помощью метода populate
        const populatedDoc = await QuestionModel.findById(doc._id).populate({ path: 'user'});

        wss.clients.forEach(client => {
            clientsMap.map(user => {
                if(user.role === 'admin' && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({type: 'createQuestion', data: populatedDoc}))
                }

                return user
            })
        })

        return res.json(populatedDoc);
    }
    catch(err){
        console.log(err)

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

        
        wss.clients.forEach(client => {
            clientsMap.map(user => {
                if(client.readyState === WebSocket.OPEN){
                    console.log('nice')
                    client.send(JSON.stringify({type: 'deleteQuestion', data: doc}))
                }

                return user
            })
        })   
        
        return res.json(doc)
        
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



export const getOne = async (req, res) => {
    try{
        const postId = req.params.id

    const doc = await QuestionModel.findByIdAndUpdate(
        {
            _id: postId
        }, 
        {
            $inc: {viewCount: 1}
        }, 
        {
            returnDocument: 'after'
        }
        ).populate({
          path: 'comments',
          populate: {
            path: 'user',
            model: 'User'
          }
        }).populate({
              path: 'user',
              select: ['fullName', 'avatarUrl']
            }).exec();


    if(!doc) {
        return res.status(404).json({
            message: 'пост не найден'
        })
    }

        return res.json(doc)
    }
    catch(err){
        return res.status(500).json({
            message: 'Ошибка при поиске статьи'
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


export const createComment = async (req, res) => {
    try{

        if(!req.body.fullName || !req.body.text){
            return res.status(404).json({
                message: 'не коректный запрос'
            })
        }

        const userComment = await UserModel.findById(req.body.user)
        const question = await QuestionModel.findById(req.body.postId).populate({ path: 'user'});


        if(userComment && question){
            if(userComment.role === 'Студент' || String(userComment._id) === String(question.user._id)){

                const checkStudentAnswer = question.comments.find(el => el.user === req.body.user)

                console.log(checkStudentAnswer)


                
                const studentAnswer = await UserModel.findByIdAndUpdate(            
                    req.body.user,
                    {$inc: {answer: checkStudentAnswer ? 0 : 1}},
                    { new: true }
                )
                
                console.log(req.body.avatar)

                const comment = await QuestionModel.findByIdAndUpdate(
                    req.body.postId,
                    {$push: {'comments': {
                        text: req.body.text, 
                        user: req.body.user
                    }
                    }}, 
                    {new: true}
                ).populate({
                    path: 'comments',
                    populate: {
                      path: 'user',
                      model: 'User'
                    }
                  }).populate({ path: 'user'});
                  

                console.log(comment)
    
                if (!comment | !studentAnswer) {
                    return res.status(404).json({ message: 'Пост не найден' });
                }

                wss.clients.forEach(client => {
                    clientsMap.map(user => {
                        if(client.readyState === WebSocket.OPEN){
                            console.log('nice')
                            client.send(JSON.stringify({type: 'createComment', data: comment}))
                        }
        
                        return user
                    })
                })    

                const message = `
                    <p>Текст: ${req.body.text}</p>
                    <p>Перейдите по ссылке: <a href="${req.body.url}">Ссылка на вопрос</a></p>
                    <p>С уважением, ИКТИБ-СОВЕТНИК</p>
                `;

                if(question.user.email && question.user._id !== comment.user._id){
                    sendMail(question.user.email, `новый ответ на ваш вопрос от пользователя ${comment.user.fullName}`, message)
                }
    
                return res.json(comment)
            }
            else{
                return res.json({
                    message: 'отказано в доступе',
                })
            }
        }

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'ошибка в создание комментария ',
            err: err
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

export const CreateLike = async(req, res) => {
    try{
        console.log(req.body.userID)
        const {postID, userID, fullName} = req.body


        console.log(postID)

        if(!userID || !postID){
            return res.status(500).json({
                message: 'данные не указаны'
            })
        }
    
        const user = await UserModel.findById(userID)
        const question = await QuestionModel.findById(postID)

        if(!user || !question){
            return res.status(404).json({
                message: 'пользователь или вопрос не найдены'
            })
        }
 
        console.log(question)

        const findUserInLikes = question.likes.find(el => el._id === userID)
        
        console.log(findUserInLikes, 'l')

        console.log(findUserInLikes)


        if(findUserInLikes){
            const updateQuestion = await QuestionModel.findByIdAndUpdate(
                postID,
                {$pull: {'likes': {_id: userID}}},
                {new: true}
            )


            if(updateQuestion){
                return res.json({result: {name: user.fullName, _id: userID, email: user.email, status: 'dislike', postID}, question})
            }
        }
        else{

            const updateQuestion = await QuestionModel.findByIdAndUpdate(
                postID,
                {$push: {'likes': {name: user.fullName, _id: userID, email: user.email, date: new Date()}}},
                {new: true}
            )

            console.log('2 b')

            if(updateQuestion){
                return res.json({result: {name: user.fullName, _id: userID, email: user.email, status: 'like', postID, date: new Date()}, question})
            }
        }


        return res.json({
            message: 'не найден вопрос или пользователь'
        })

    }
    catch(err) {
        res.status(404).json({
            message: 'ошибка при создании лайка'
        })
    }
}

