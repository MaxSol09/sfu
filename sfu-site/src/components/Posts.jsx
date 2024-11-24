import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { fetchQuestions, getQuestionPage } from '../redux/questions.ts'
import Eyes from '../images/eyes.svg'
import Comment from '../images/comment.svg'
import { Button, Spin } from 'antd'
import { changeCommentForm, changeOpenFormCreate } from '../redux/page.ts'
import { Question } from './Question.jsx'

export const Posts = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(el => el.questions.questions.status)
    const questionsArr = useAppSelector(el => el.questions.questionsArr.items)

    const loadingQuestions = status === 'success'

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [])

    useEffect(() => {
        if(loadingQuestions){
            console.log(questionsArr)
        }
    }, [status])

    const openQuestion = (id) => {
      dispatch(getQuestionPage({id: id}))
      dispatch(changeCommentForm({id: id}))
    }

  return (
    <>
    <div className='grid w-full place-items-center m-auto pt-[20px] pb-[100px] gap-[30px]'>
      {questionsArr.length ? questionsArr.map(el => (
                    <div key={el._id} className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
                    <h1 className='text-[21px]'>Название: {el.title}</h1>
                    <p className='text-[16px]'>Описание: {el.text.length > 50 ? el.text.slice(0, 50) + '........' : el.text}</p>
                    <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                      <div className='flex gap-[20px]'>
                        <div className='flex gap-[5px]'>
                          <p>Ответов: {el.comments.length}</p>
                        </div>
                      </div>
                      <Button onClick={() => openQuestion(el._id)} style={{
                          color: 'white',
                          backgroundColor: '#4CAF50', // Default background color
                          borderColor: '#4CAF50',     // Default border color
                          ':hover': {                  // Hover styles
                            backgroundColor: '#388E3D',
                            borderColor: '#388E3D',
                          },
                          ':active': {                 // Active (pressed) styles
                            backgroundColor: '#2E682C',
                            borderColor: '#2E682C',
                          },
                        }}   
                         >Ответить</Button>
                    </div>
                  </div>
      )) : <p className='pt-[20px]'>Вопросы отсутствуют</p>}
        </div>
    </>
  )
}
