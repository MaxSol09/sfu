import React from 'react'
import Land from '../images/land.png'
import Comment from '../images/comment.svg'
import Eyes from '../images/eyes.svg'
import {Button} from 'antd'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { Posts } from './Posts.jsx'
import { changeOpenFormCreate } from '../redux/page.ts'
import { fetchQuestions, newQuestion, oldQuestions, popularQuestions } from '../redux/questions.ts'

export const Questions = () => {

  const {page} = useAppSelector(el => el.page)
  const form = useAppSelector(el => el.page.form)
  const comments = useAppSelector(el => el.page.commentForm.type)
  const questions = useAppSelector(el => el.questions.questions.items)
  

  const dispatch = useAppDispatch()

  /*/
          <div className='flex gap-[20px] justify-center items-center'>
            <img className='w-[70px]' src={Land} alt="рука" />
            <div className='w-[500px] space-y-[3px]'>
              <h1 className='text-[20px] leading-6'>Добро пожаловать в ИКТИБ советник, Максим!</h1>
              <p className='break-words text-[17px] leading-5 text-gray-400'>Здесь ты можешь задавать вопросы связанные с институтом, а также помогать другим.</p>
            </div>
            <Button className='ml-[10px] text-[17px]'>Задать вопрос</Button>
        </div>
        /*/

  return (
    <div style={{display: page === "home" & form === false & comments === false ? 'grid' : 'none'}} className=' grid w-full'>
        <div className='flex justify-between items-center px-[55px]'>
            <div className='w-[500px] space-y-[3px]'>
              <h1 className='text-[20px] leading-6'>Вопросы</h1>
            </div>
            <Button onClick={() => dispatch(changeOpenFormCreate())} className='ml-[10px] text-[17px]'>Задать вопрос</Button>
        </div>
        <div className='flex items-center px-[55px] justify-between pt-[20px]'>
          <h1 className='text-[18px]'>Всего вопросов: {questions.length ? questions.length : '0'}</h1>
          <div className='flex gap-[20px]'>
            <h1 className='text-[20px]'>Категории:</h1>
            <Button onClick={() => dispatch(popularQuestions())}>Популярные</Button>
            <Button onClick={() => dispatch(newQuestion())}>Новые</Button>
            <Button onClick={() => dispatch(oldQuestions())}>Старые</Button>
            <Button onClick={() => dispatch(fetchQuestions())}>Все</Button>
          </div>
        </div>
        <Posts />

    </div>
  )
}
