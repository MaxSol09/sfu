import React from 'react'
import { fetchQuestions, newQuestion, oldQuestions, popularQuestions } from '../../../redux/questions'
import { Button } from 'antd'
import { useAppDispatch } from '../../../redux/hooks'

export const FilterQuestions: React.FC = () => {

    const dispatch = useAppDispatch()

    console.log('render filter')

    return (
        <div className='flex gap-[20px] max-[590px]:flex-wrap'>
            <h1 className='text-[20px]'>Категории:</h1>
            <Button onClick={() => dispatch(popularQuestions())}>Полезные</Button>
            <Button onClick={() => dispatch(newQuestion())}>Новые</Button>
            <Button onClick={() => dispatch(oldQuestions())}>Старые</Button>
            <Button onClick={() => dispatch(fetchQuestions())}>Все</Button>
        </div>
    )
}
