# ДОКУМЕНТАЦИЯ ПО API

    /auth/register - регистрация. Принимает role, fullName, password, email\

    /auth/login - логин. Принимает password и email

    /auth/me - получение информации о пользователе при перезагрузке или входе. Принимает jwt token, если пользователь          
               регистрировался или не выходил из аккаунта

    /question/:id - получение вопроса по id

    /upload - для загрузки картинок на сервер. То есть аватарок или фона

    /user/img - смена аватарки у пользователя. Принимает id и avatar
    /user/background - смена фона профиля у пользователя. Принимает id и backgroundProfile
    /user/text - смена описания профиля у пользователя. Принимает userID и text
    /user/:id - получение инфы о пользователе. Принимает id

    /tags - получение тэгов(самых популярных тем вопросов). Принимает jwt token, если пользователь 
            регистрировался или не выходил из аккаунт
    
    /question/create - создание вопроса. Принимает title, text, массив tags, userId
    /questions - получение всех вопросов. Принимает jwt token
    /question/like - создание лайка у вопроса. Принимает fullName, userID, postID

    /create/comment - создание комментария/ответа на вопрос. Принимает fullName, text, commentId, userId, avatar(необязательно)