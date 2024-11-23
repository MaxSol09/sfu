import { body } from "express-validator";

export const themeValidation = [
    body('title', 'Введите название стать. Минимум 3 символа').isLength({min: 3}).isString(),
    body('text', 'Введите текст темы. Максимум 500 символов').isLength({max: 500}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray()
]
