import React, { useState, useEffect } from 'react';
import { getUser } from '../redux/auth.ts';
import uniqid from 'uniqid';
import User from '../images/user.jpg';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { isPost, isUser } from '../utils/checkValue.ts';
import { createComment, deleteComment } from '../redux/questions.ts';

export const Comments = () => {

    const [text, setText] = useState('');
    const { state } = useAppSelector((state) => state.auth);
    const questionPost = useAppSelector(el => el.questions.questions.items)
    const question = useAppSelector(el => el.questions.questions.items)
    const [arrayComment, setArrayComment] = useState([]);
    const [modal, setModal] = useState(false)
    const dispatch = useAppDispatch()
    const idQuestion = useAppSelector(el => el.page.commentForm.id)
    const comments = useAppSelector(el => el.questions.comments)


    console.log(comments)
    console.log(question)

    
      const submitComment = () => {
          const commentData = {
            postId: idQuestion,
            fullName: state.fullName,
            text,
            commentId: uniqid(),
            avatar: state.avatarUrl,
            userId: state._id,
          };


          console.log(commentData)
    
          dispatch(createComment(commentData))
        
          setText('')
      }


  return (
    <div className='py-[30px] text-2xl space-y-8 mr-[20px]'>
      <div className='flex gap-5'>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          className='p-3 w-4/5 text-xl border-2 border-gray-200 focus:outline-gray-400'
          placeholder='Написать комментарий'
        />
        <button
          onClick={submitComment}
          className='text-xl bg-green-300 py-2 px-6 text-white rounded'
        >
          Отправить
        </button>
      </div>
      <h1 className='text-[21px]'>Комментарии:</h1>
      {comments.length > 0 ? comments.map((comment) => {
          return (
          <div className="py-2 px-4 break-words realtive shadow-custom-rounded w-3/4" key={comment.commentId}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <img className='w-[50px] h-[50px] rounded-full mr-1' src={comment.avatarUrl ? comment.avatarUrl : User} alt='User'/>
                <button className='text-gray-500'>{comment.fullName}</button>
              </div>            
            </div>
            <p className="leading-none py-3'text-black">{comment.text}</p>
          </div>
        )}).reverse() : <p>нет</p>}
    </div>
  )
}
