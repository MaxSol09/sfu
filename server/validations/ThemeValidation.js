import { body } from "express-validator";

export const themeValidation = [
    body('title', 'Введите название стать. Минимум 3 символа').isLength({min: 10, max: 100}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray()
]
