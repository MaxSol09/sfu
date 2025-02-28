import React, { useEffect, useState } from 'react'
import Logo from '../../images/logo.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changePage, changeSupport } from '../../redux/page'
import { fetchQuestions, fetchTags} from '../../redux/questions'
import {Link, useNavigate} from 'react-router-dom'
import { getVkUser, meFetch } from '../../redux/auth'
import { isUser } from '../../utils/checkValue'
import { TypePage } from '../../types/types'
import { Chat } from '../Chat/Chat'
import { Logout } from './Logout'
import { SearchPosts } from './SearchPosts'


type Props = {
  currPage: TypePage
}

export const Header: React.FC<Props> = ({currPage}) => {

  const questionLink = useAppSelector(el => el.page.questionOpen.link)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)

  const {state, status} = useAppSelector(el => el.auth)

  const token = localStorage.getItem('vk_token')
  const vkID = localStorage.getItem('vk_userId')

  useEffect(() => {
    if(token && vkID){
      dispatch(getVkUser({token, vkID}))
    }
  }, [token, vkID, dispatch])

  useEffect(() => {
    if(status === 'none'){
      dispatch(meFetch())
    }
    else if(status === 'success'){
      dispatch(fetchQuestions())
    }
  }, [dispatch, status])


  const homeClick = () => {
    dispatch(fetchQuestions())
    dispatch(fetchTags())

    dispatch(changePage({type: 'HOME'}))

    if(questionLink){
      navigate('/' + questionLink.slice(22, questionLink.length))
    }
    else{
      navigate('/home')
    }
    
  }

  const aboutClick = () => {

    if(currPage === 'question'){
      dispatch(changePage({type: 'ABOUT', link: window.location.href}))
    }
    else{
      dispatch(changePage({type: 'ABOUT'}))
    }

    navigate('/about')
  }


  return (
    <>
    <header className='fixed bg-white border-b-[2px] z-20 flex py-[20px] px-[100px] w-full items-center gap-[20px] justify-between'>
      <img onClick={() => homeClick()} className='w-[180px]' src={Logo} alt="logo" />
      <nav className='flex items-center gap-[40px] text-[17px] text-gray-500'>
          <button onClick={() => homeClick()} className={`${currPage !== 'about' && 'text-black'}`}>Вопросы</button>
          <button onClick={() => aboutClick()} className={`${currPage === 'about' && 'text-black'}`}>Об институте</button>
          <button onClick={() => dispatch(changeSupport({type: false}))}>Поддержка</button>
      </nav>
      <SearchPosts />
      { isUser(state) && state._id ? <button onClick={() => setModal(true)} style={{marginRight: modal ? '17px' : ''}} 
        className='bg-red-500 text-white py-[9px] px-[40px] rounded-sm'>
        Выйти
      </button>
      : <Link to={'/'} style={{backgroundColor: '#4CAF50', color: 'white'}} className='py-[9px] px-[40px]'>Войти</Link>}
    </header>
    <Logout modal={modal} setModal={setModal}/>
    <Chat />
  </>
  )
}
