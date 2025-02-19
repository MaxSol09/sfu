import React from 'react'
import Logo from '../images/logo.png'
import Logout from '../images/log-out.png'
import Users from '../images/group.png'
import Questions from '../images/question.png'
import Chats from '../images/chat.png'
import Complaint from '../images/complaints.png'
import { useNavigate } from 'react-router-dom'

type Props = {
  currPage: 'users' | 'question' | 'questions' | 'chats' | 'complaints'
}

export const Panel: React.FC<Props> = ({currPage}) => {

  const navigate = useNavigate()

  const usersClick = () => {
    navigate('/users')
  }

  const questionsClick = () => {
    navigate('/questions')
  }

  const complaintsClick = () => {
    navigate('/complaints')
  }

  const chatsClick = () => {
    navigate('/chats')
  }


  return (
    <div className='flex flex-col justify-between h-full py-[15px] items-center pb-[30px] cursor-pointer'>
      <div className='grid gap-[70px]'>
        <div className='w-full flex justify-center'>
          <img className='w-[70%]' src={Logo}></img>
        </div>
        <div className='grid gap-[20px] text-[22px] justify-center'>
          <button onClick={() => usersClick()} className={`flex items-center gap-[10px] px-[20px] py-[5px] ${currPage === 'users' && 'bg-white rounded-[10px] shadow-sm'}`}>
            <img className='h-[25px] mt-[3px]' src={Users}></img>пользователи
          </button>
          <button onClick={() => questionsClick()}  className={`flex items-center gap-[10px] px-[20px] py-[5px] ${(currPage === 'questions' || currPage === 'question') && 'bg-white rounded-[10px] shadow-sm'}`}>
            <img className='h-[25px]' src={Questions}></img>вопросы
          </button>
          <button onClick={() => complaintsClick()}  className={`flex items-center gap-[10px] py-[5px] px-[20px] ${currPage === 'complaints' && 'bg-white rounded-[10px] shadow-sm'}`}>
            <img className='h-[25px] ' src={Complaint}></img>жалобы
          </button>
          <button onClick={() => chatsClick()}  className={`flex items-center gap-[10px] py-[5px] px-[20px] ${currPage === 'chats' && 'bg-white rounded-[10px] shadow-sm'}`}>
            <img className='h-[25px] mt-[5px]' src={Chats}></img>чаты
          </button>
        </div>
      </div>
      <button className='text-[22px] flex gap-[10px] items-center'>
        <img className='h-[30px] mt-[3px]' src={Logout}></img>Выйти
      </button>
    </div>
  )
}
