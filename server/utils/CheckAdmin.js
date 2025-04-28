import jwt from 'jsonwebtoken'

export default (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(500).json({
            message: 'не указан токен'
        })
    }

    const token = (req.headers.authorization.slice(7))
    
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

            if(!decoded){
                return req.status(500).json({
                    message: 'октазано в доступе'
                })
            }
            
            

            req.userId = decoded._id

            next()
        }
        catch(error){
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    }
    else{
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }

}