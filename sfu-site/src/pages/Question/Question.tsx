import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getQuestion } from '../../redux/questions'
import Eyes from '../../images/eyes.svg'
import Comment from '../../images/comment.svg'
import { Comments } from './Comments'
import { isPost } from '../../utils/checkValue'
import { Header } from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { Panel } from '../../components/Panels/Panel'
import { meFetch } from '../../redux/auth'
import {Skeleton } from 'antd';


export const Question: React.FC = () => {

  const question = useAppSelector(el => el.questions.question.items)
  const status = useAppSelector(el => el.questions.question.status)
  const {id} = useParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meFetch())

    if(id !== undefined){
      dispatch(getQuestion(id))
    }
  }, [dispatch, id])

  const loadingQuestion = status === 'success'

  return (
    <>
    <Header currPage={'question'}/>
    <Panel />
    <main className='z-0 pt-[130px] ml-[27%] pr-[100px] max-[1130px]:ml-[0%] max-[1130px]:px-[100px] max-[950px]:px-[50px] max-[520px]:px-[20px]'>
      {!loadingQuestion ? (
        <Skeleton paragraph={{rows: 6}} className='pb-[60px] pt-[10px] w-full'/>
      ) : isPost(question) ? <div>
          <div className='px-[20px] pt-[10px] pb-[10px] bg-gray-200'>
            <h1 className='text-[20px] break-all'>Название: {question.title}</h1>
            <p className='text-[19px] pt-[5px] break-all'>
              {question.text.length > 0 ? `Описание: ${question.text}` : 'Описание отсутствует'}
            </p>
            <div className='flex gap-[30px]'>
              {question.tags.length ? question.tags.map(el => (
                <div key={el.id} className='text-[18px] text-gray-500 pt-[10px]'>#{el.tag}</div>
              )): <p>Тэги отсутствуют</p>}
            </div>
            <div className='flex justify-between pt-[20px] max-[520px]:pt-[10px] max-[520px]:flex-wrap '>
              <div className='flex gap-[10px]'>
                <div className='flex gap-[3px]'>
                  <img className='w-[23px]' src={Eyes} alt="просмотры" />
                  <p>{question.viewCount}</p>
                </div>
                <div className='flex gap-[3px]'>
                  <img className='w-[23px]' src={Comment} alt="комменты" />
                  <p>{question.comments.length}</p>
                </div>
              </div>
              <p className='max-[520px]:pt-[10px]'>Дата: {question.createdAt.slice(0, 10)} 
                <span className='pl-[15px]'>Время публикации: {+question.createdAt.slice(11, 13)}
                {question.createdAt.slice(13, 16)}</span>
              </p>
            </div>
          </div>
          </div>
         : <p>Вопрос не найден</p>}
         {!loadingQuestion ? <Skeleton title={false} className='w-3/4' paragraph={{rows: 2}} avatar/> 
         : 'comments' in question && <Comments /> }
      </main> 
    </>
  )
}
