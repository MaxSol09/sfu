import React, { useEffect, useState } from 'react'
import Logo from '../images/logo.png'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { changeCommentForm, changeOpenFormCreate, changePage, changeSupport } from '../redux/page.ts'
import { searchQuestion } from '../redux/questions.ts'
import {Link, useNavigate} from 'react-router-dom'
import { Modal } from 'antd'
import { logout } from '../redux/auth.ts'


export const Header = () => {

  const {page} = useAppSelector(el => el.page)
  const openForm = useAppSelector(el => el.page.form)
  const commentForm = useAppSelector(el => el.page.commentForm)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [modal,setModal] = useState(false)

  const {state, status} = useAppSelector(el => el.auth)

  useEffect(() => {
    if(!localStorage.getItem('JWTtoken')){
      navigate('/')
    }
  }, [status, navigate])

  const logoutFun = () => {
    dispatch(logout())
    setModal(false)
    localStorage.removeItem('JWTtoken')
    navigate('/')
    window.location.reload()
  }

  const modalFun = () => {
    setModal(true)
  }


  const homeClick = () => {
    dispatch(changePage({type: 'HOME'}))

    if(openForm){
      dispatch(changeOpenFormCreate())
    }
    else if(commentForm){
      dispatch(changeCommentForm({id: ''}))
    }

  }

  const findPost = (e) => {
    if(!e) return 

    setTimeout(() => {
        dispatch(searchQuestion({title: e}))
    }, 300)
  }

  return (
    <>
    <header className='fixed bg-white border-b-[2px] z-20 flex py-[20px] px-[100px] w-full items-center gap-[20px] justify-between'>
        <img className='w-[180px]' src={Logo} alt="logo" />
        <nav className='flex items-center gap-[40px] text-[17px] text-gray-500'>
            <button onClick={() => homeClick()} className={`${page === 'home' && 'text-black'}`}>Вопросы</button>
            <button onClick={() => dispatch(changeSupport({type: false}))}>Поддержка</button>
            <button onClick={() => dispatch(changePage({type: 'ABOUT'}))} className={`${page === 'about' && 'text-black'}`}>Об институте</button>
        </nav>
        <input onChange={e => findPost(e.target.value)} className='text-[20px] outline-gray-400 border-[2px] w-[400px] py-[5px] px-[10px]' placeholder='найти вопрос' type="text" />
        { state._id ? <button onClick={() => modalFun()} style={{marginRight: modal === true ? '17px' : ''}} className='bg-red-500 text-white py-[9px] px-[40px] rounded-sm'>Выйти</button>
         : <Link to={'/'} style={{backgroundColor: '#4CAF50', color: 'white'}} className='py-[9px] px-[40px]'>Войти</Link>}
    </header>
    <Modal okText={'Выйти'} cancelText={'Нет'} open={modal} onOk={() => logoutFun()} onCancel={() => setModal(false)} cancelButtonProps={{style: {fontSize: "20px"}}} okButtonProps={{style: {fontSize: '20px'}}}>
    <p className='text-xl pb-3'>Вы уверены, что хотите выйти из аккаунта?</p>
  </Modal>
  </>
  )
}
