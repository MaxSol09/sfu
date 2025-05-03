import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Posts } from '../../components/Posts/Posts'
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
            {isUser(user) && isUser(state) && (
                <div className='text-[18px] pt-[20px] text-slate-800 flex justify-center gap-[30px] cursor-pointer max-[750px]:gap-[20px] max-[700px]:text-[16px] max-[500px]:gap-[10px] max-[700px]:text-[15px] max-[490px]:overflow-hidden overflow-hidden'>
                    <p onClick={() => setVariant('вопросы')} 
                        className='px-[5px]' 
                        style={{
                            borderBottom: variant === 'вопросы' ? '2px solid gray' : '2px solid white', 
                            transition: 'all 0.2s', 
                            whiteSpace: 'nowrap' // Prevents text from wrapping
                        }}>
                        {user.role === 'Студент' ? 'Ответы' : 'Вопросы'}
                    </p>
                    <p onClick={() => setVariant('модерация')} 
                        className={`px-[5px] ${user.role === 'Абитуриент' && user._id === state._id ? 'flex' : 'hidden'}`} 
                        style={{ 
                            borderBottom: variant === 'модерация' ? '2px solid gray' : '2px solid white', 
                            transition: 'all 0.2s', 
                            whiteSpace: 'nowrap' // Prevents text from wrapping
                        }}>
                        На модерации
                    </p>
                    <p onClick={() => setVariant('понравившиеся')} 
                        className='px-[5px]' 
                        style={{
                            borderBottom: variant === 'понравившиеся' ? '2px solid gray' : '2px solid white', 
                            transition: 'all 0.2s'
                        }}>
                        Понравившиеся
                    </p>
                </div>
            )}
            <Posts loadingQuestions={loadingQuestions} questions={variant === 'вопросы' ? isUser(user) && user.role === 'Студент' ? myAnswers : myQuestions : variant === 'модерация' ? myModerationQuestions : myFavorite} />
        </>
    )
}
