import React from 'react'
import { Spin } from 'antd'
import { useAppSelector } from '../../redux/hooks'
import { isUser } from '../../utils/checkValue'
import { TypePost } from '../../types/types'
import { Post } from './Post'

type Props = {
    questions: TypePost[] | [],
    loadingQuestions: boolean
}

export const Posts: React.FC<Props> = ({questions, loadingQuestions}) => {  

    const state = useAppSelector(el => el.auth.state)
  
    console.log('posts render')
      
  
    return (
    <div className='grid place-items-center pt-[20px] pb-[100px] gap-[30px]'>
      {!loadingQuestions ? (
        <Spin className='py-[20px] flex justify-center'/>
      ) : questions.length ? questions.map(el => (
        <Post key={el._id} question={el}/>
      )) : <p className='pt-[20px]'>Вопросы отсутствуют</p>}
    </div>
  )
}
