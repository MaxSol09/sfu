import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    if(!req.headers.authorization & req.headers.authorization.length < 7){
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }

    const token = (req.headers.authorization.slice(7))
    
    if(token){
        try{
            const decoded = jwt.verify(token, 'secretMax392')

            req.userId = decoded._id

            next()
        }catch(error){
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