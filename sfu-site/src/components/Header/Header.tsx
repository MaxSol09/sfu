import React, { useEffect, useMemo, useState } from 'react'
import Logo from '../../images/logo.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changePage, changeSupport } from '../../redux/page'
import { fetchQuestions, fetchTags} from '../../redux/questions'
import {Link, useNavigate} from 'react-router-dom'
import { meFetch } from '../../redux/auth'
import { isUser } from '../../utils/checkValue'
import { TypePage } from '../../types/types'
import { Chat } from '../Chat/Chat'
import { Logout } from './Logout'
import { SearchPosts } from './SearchPosts'
import MenuImg from '../../images/menu.png'
import { Menu } from './Menu'


type Props = {
  currPage: TypePage
}

const MemoSearchPosts = React.memo(SearchPosts)

export const Header: React.FC<Props> = ({currPage}) => {

  const questionLink = useAppSelector(el => el.page.questionOpen.link)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)

  const {state, status} = useAppSelector(el => el.auth)

  useEffect(() => {
    if(status === 'none'){
      dispatch(meFetch())
    }

  }, [dispatch, status])

  useEffect(() => {
    dispatch(fetchQuestions())
  }, [dispatch])


  const homeClick = () => {

    console.log('render homeclick')

    dispatch(fetchQuestions())
    dispatch(fetchTags())

    dispatch(changePage({type: 'HOME'}))

    if(questionLink){
      navigate('/' + questionLink.slice(22, questionLink.length))
    }
    else{
      navigate('/')
    }
    
  }

  const aboutClick = () => {

    console.log('render aboutclick')

    if(currPage === 'question'){
      dispatch(changePage({type: 'ABOUT', link: window.location.href}))
    }
    else{
      dispatch(changePage({type: 'ABOUT'}))
    }

    navigate('/about')
  }

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className='fixed bg-white border-b-[2px] z-20 flex py-[20px] px-[70px] max-[1300px]:px-[100px] max-[1120px]:px-[55px] max-[940px]:px-[10px] max-[720px]:px-[10px] w-full items-center gap-[20px] max-[500px]:gap-[10px] max-[1130px]:px-[65px] justify-around'>
        <img onClick={() => homeClick()} className='max-[540px]:w-[110px] max-[940px]:w-[130px] max-[1300px]:w-[150px]' src={Logo} alt="logo" width={180}/>
        <nav className='flex items-center gap-[40px] text-[17px] text-gray-500 max-[1130px]:hidden'>
            <button onClick={() => homeClick()} className={`${currPage !== 'about' && 'text-black'}`}>Вопросы</button>
            <button onClick={() => aboutClick()} className={`${currPage === 'about' && 'text-black'}`}>Об институте</button>
            <button onClick={() => dispatch(changeSupport({type: false}))}>Поддержка</button>
        </nav>
        <MemoSearchPosts />
        { isUser(state) && state._id ? <button onClick={() => setModal(true)} style={{marginRight: modal ? '17px' : ''}} 
          className='bg-red-500 text-white py-[9px] px-[40px] rounded-sm max-[1130px]:hidden'>
          Выйти
        </button>
        : <Link className='py-[9px] px-[40px] max-[1130px]:hidden' to={'/login'} style={{backgroundColor: '#4CAF50', color: 'white'}}>Войти</Link>}
        <img onClick={() => setOpen(true)} className='hidden w-[40px] max-[1130px]:flex' src={MenuImg} alt='menu'></img>
      </header>
      <Logout modal={modal} setModal={setModal}/>
      <Menu open={open} setOpen={setOpen} currPage={currPage}/>
      <Chat />
    </>
  )
}
