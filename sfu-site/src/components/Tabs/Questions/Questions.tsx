import React from 'react'
import {Button, Tooltip} from 'antd'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changePage } from '../../../redux/page'
import { isUser } from '../../../utils/checkValue'
import { Posts } from '../../Posts/Posts'
import { FilterQuestions } from './FilterQuestions'


const MemoFilterQuestions = React.memo(FilterQuestions)

export const Questions: React.FC = () => {

  const status = useAppSelector(el => el.questions.questions.status)
  const questions = useAppSelector(el => el.questions.questionsArr.items)
  const state = useAppSelector(el => el.auth.state)
  const dispatch = useAppDispatch()

  const statusQuestions = status === 'success'
  console.log(questions)

  console.log(status)

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

  const formopen = () => {
    console.log('qg32222222S')
    dispatch(changePage({type: 'FORM_CREATE'}))
  }

  return (
    <div className='grid w-full'>
        <div className='flex justify-between items-center'>
            <div className='space-y-[3px]'>
              <h1 className='text-[20px]'>Вопросы</h1>
            </div>
            <Tooltip color='gray' title={isUser(state) ? state.role === 'Студент' ? 'Доступно абитуриентам' : state.ban 
              ? `Вы заблокированы. Причина - ${state.banText ? state.banText : 'неизвестна'}` : '' : 'Войдите в аккаунт'}>
              <Button id='titlewrapper'  disabled={isUser(state) && state.role === 'Абитуриент' && !state.ban ? false : true} onClick={() => formopen()} 
                className='ml-[10px] text-[17px]'>Задать вопрос
              </Button>
            </Tooltip>
        </div>
        <div className='items-center justify-between flex pt-[20px] max-[1200px]:flex-wrap max-[1200px]:gap-[10px]'>
          <h1 className='text-[18px]'>Всего вопросов: {questions.length ? questions.length : '0'}</h1>
          <MemoFilterQuestions />
        </div>
        <Posts loadingQuestions={statusQuestions} questions={questions}/>
    </div>
  )
}
