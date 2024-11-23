import { body } from "express-validator"


export const linkValidation = [
    body('link', 'ссылка указана не коректно').isURL()
]