import { Button } from 'antd'
import React from 'react'
import { useQuestionsStore } from '../../zustand/questions'

export const FilterQuestions: React.FC = () => {

    const questionsArr = useQuestionsStore(el => el.questionsArr.items)

    const {getAllQuestions, oldQuestions, newQuestions, popularQuestions} = useQuestionsStore(el => el)

    return (
        <div className='flex flex-wrap gap-[20px] break-all'>
            <h1 className='text-[20px]'>Категории:</h1>
            <Button onClick={() => popularQuestions()}>Полезные</Button>
            <Button onClick={() => newQuestions()}>Новые</Button>
            <Button onClick={() => oldQuestions()}>Старые</Button>
            <Button onClick={() => getAllQuestions(questionsArr)}>Все</Button>
        </div>
    )
}
