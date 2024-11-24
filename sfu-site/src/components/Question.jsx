import React, { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks.ts'
import { useDispatch } from 'react-redux'
import { getQuestionPage } from '../redux/questions.ts'
import Eyes from '../images/eyes.svg'
import Comment from '../images/comment.svg'
import { Comments } from './Comments.jsx'

export const Question = () => {

  const comments = useAppSelector(el => el.questions.comments)
  const commentForm = useAppSelector(el => el.page.commentForm.type)
  const question = useAppSelector(el => el.questions.question.items)

  console.log(question)


  const dispatch = useDispatch()

  return (
    <div style={{display: commentForm ? 'grid' : 'none'}} className='mx-[50px]'>
      {question.length ? question.map(el => (
        <>
        <div className='px-[20px] pt-[10px] pb-[10px] mr-[50px] bg-gray-200'>
          <h1 className='text-[20px]'>Название: {el.title}</h1>
          <p className='text-[19px] pt-[5px] break-words max-w-[1000px] '>
            {el.text.length > 0 ? `Описание:${el.text}` : 'Описание отсутствует'}
          </p>
          <div className='flex gap-[30px]'>
            {el.tags.length ? el.tags.map(el => (
              <div className='text-[18px] text-gray-500 pt-[10px]'>#{el.tagText}</div>
            )): <p>Тэги отсутствуют</p>}
          </div>
          <div className='flex justify-between pt-[20px]'>
            <div className='flex gap-[10px]'>
              <div className='flex gap-[3px]'>
                <img src={Eyes} alt="просмотры" />
                <p>{el.viewCount}</p>
              </div>
              <div className='flex gap-[3px]'>
                <img src={Comment} alt="комменты" />
                <p>{el.comments.length}</p>
              </div>
            </div>
            <p>Дата: {el.createdAt.slice(0, 10)} <span className='pl-[15px]'>Время публикации: {+el.createdAt.slice(11, 13) + 3}{el.createdAt.slice(13, 16)}</span></p>
          </div>
        </div>
        <Comments id={question._id}/>
        </>
      )) : <p>Вопрос не найден</p>}
    </div> 
  )
}
