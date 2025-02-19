import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Posts } from '../Posts/Posts'
import { isUser } from '../../utils/checkValue'

type TypeVariants = 'вопросы' | 'модерация' | 'понравившиеся'

export const Variants: React.FC = () => {

    const [variant, setVariant] = useState<TypeVariants>('вопросы')

    const statusQuestions = useAppSelector(el => el.questions.questions.status)

    const myQuestions = useAppSelector(el => el.questions.myQuestions.items)
    const myModerationQuestions = useAppSelector(el => el.questions.myModerationQuestions.items)
    const myFavorite = useAppSelector(el => el.questions.favorite)
    const myAnswers = useAppSelector(el => el.questions.myAnswer.value)

    const user = useAppSelector(el => el.auth.user.value)
    const state = useAppSelector(el => el.auth.state)

    console.log(myFavorite)

    const loadingQuestions = statusQuestions  === 'success'

    return (
        <>
            {isUser(user) && isUser(state) && <div className='text-[18px] pt-[20px] text-slate-800 flex justify-center gap-[30px] cursor-pointer'>
                <p onClick={() => setVariant('вопросы')} className='px-[5px]' style={{borderBottom: variant === 'вопросы' ? '2px solid gray' : '2px solid white', transition: 'all 0.2s'}}>{user.role === 'Студент' ? 'Ответы' : 'Вопросы'}</p>
                <p onClick={() => setVariant('модерация')} className={`px-[5px] ${user.role === 'Абитуриент' && user._id === state._id ? 'flex' : 'hidden'}`} style={{borderBottom: variant === 'модерация' ? '2px solid gray' : '2px solid white', transition: 'all 0.2s'}}>На модерации</p>
                <p onClick={() => setVariant('понравившиеся')} className='px-[5px]' style={{borderBottom: variant === 'понравившиеся' ? '2px solid gray' : '2px solid white', transition: 'all 0.2s'}}>Понравившиеся</p>
            </div>}
            <Posts loadingQuestions={loadingQuestions} questions={variant === 'вопросы' ? isUser(user) && user.role === 'Студент' ? myAnswers : myQuestions : variant === 'модерация' ? myModerationQuestions : myFavorite} />
        </>
    )
}
