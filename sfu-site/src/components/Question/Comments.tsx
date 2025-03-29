import React, { useState } from 'react';
import uniqid from 'uniqid';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isPost, isUser } from '../../utils/checkValue';
import { createComment } from '../../redux/questions';
import { Tooltip } from 'antd';
import { Comment } from './Comment';

export const Comments: React.FC = () => {

    const [text, setText] = useState('');
    const { state } = useAppSelector((state) => state.auth);
    const question = useAppSelector(el => el.questions.question.items)
    const statusCreate = useAppSelector(el => el.questions.commentCreateStatus)
    const dispatch = useAppDispatch()
    const {id} = useParams()

    const loadingComment = statusCreate === 'loading'

    const submitComment = (e: any) => {
      e.preventDefault()

        if(loadingComment || !isUser(state) || id === undefined || state.ban) return

        const commentData = {
          postId: id,
          fullName: state.fullName,
          text,
          commentId: uniqid(),
          avatar: state.avatarUrl,
          user: state._id,
          url: window.location.href
        };


        console.log(commentData)
  
        dispatch(createComment(commentData))
      
        setText('')
    }



  return (
    <div className='py-[20px] text-2xl space-y-[20px] pb-[100px] mr-[50px]'>
      {isUser(state) && isPost(question) && 
      <form onSubmit={submitComment} style={{display: state.speciality.toLowerCase() === question.tags[0].tag.toLowerCase() || (isUser(question.user) && state._id === question.user._id) ? 'flex' : 'none' }} className='gap-[20px] justify-between'>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          className='p-3 w-full text-xl border-2 border-gray-200 focus:outline-gray-400'
          placeholder='Написать комментарий'
        />
        <Tooltip color='gray' title={isUser(state) ? state.role === 'Абитуриент' && state._id !== question.user._id ? 'Доступно определённым студентам' 
            : state.ban ? `Вы заблокированы. Причина - ${state.banText ? state.banText : 'неизвестна'}` : '' : ''}
          >
          <button
            onClick={e => submitComment(e)}
            disabled={statusCreate === 'loading' && true}
            className={`text-xl bg-green-300 ${loadingComment || state.ban ? 'hover:bg-gray-300' : 'hover:bg-green-400'} delay-75 py-2 px-6 text-white rounded`}
          >
            Отправить
          </button>
        </Tooltip>
      </form>}
      <h1 className='text-[21px]'>Комментарии:</h1>
      {isPost(question) && question.comments.length > 0 ? question.comments.map((comment, index) => {
          return (
            <Comment key={index} comment={comment}/>
        )}).reverse() : <p className='text-[18px]'>отсутствуют</p>
      }
    </div>
  )
}
