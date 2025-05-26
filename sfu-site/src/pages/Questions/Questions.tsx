import React from 'react'
import {Button, Tooltip} from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changePage } from '../../redux/page'
import { isUser } from '../../utils/checkValue'
import { Posts } from '../../components/Posts/Posts'
import { FilterQuestions } from './FilterQuestions'
import { Tags } from './Tags'


const MemoFilterQuestions = React.memo(FilterQuestions)

export const Questions: React.FC = () => {

  const status = useAppSelector(el => el.questions.questions.status)
  const questions = useAppSelector(el => el.questions.questionsArr.items)
  const state = useAppSelector(el => el.auth.state)
  const dispatch = useAppDispatch()

  const statusQuestions = status === 'success'

  const formopen = () => {
    dispatch(changePage({type: 'FORM_CREATE'}))
  }

  const date = new Date()

  console.log(date)

  console.log('FILTER >>> ', questions.filter(el => el.createdAt.slice(0, 10) === '2025-05-17'))

  return (
    <div className='grid w-full'>
        <Tags />
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
