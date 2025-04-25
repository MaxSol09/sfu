import { body } from "express-validator";


export const registerValidation = [
    body('role', 'роль не указана').isString(),
    body('email', 'email указан не коректно').isEmail(),
    body('fullName', 'имя должно состоять минимум из 3 символов').isLength({min: 3})
]

export const loginValidation = [
    body('email', 'email указан не коректно').isEmail()
]