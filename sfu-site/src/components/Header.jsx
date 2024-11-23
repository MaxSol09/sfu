import React from 'react'
import Logo from '../images/logo.png'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { changePage, changeSupport } from '../redux/page.ts'


export const Header = () => {

  const {page} = useAppSelector(el => el.page)
  const dispatch = useAppDispatch()

  return (
    <header className='fixed bg-white border-b-[2px] z-20 flex py-[20px] px-[100px] w-full items-center justify-between'>
        <img className='w-[180px]' src={Logo} alt="logo" />
        <nav className='flex items-center gap-[30px] text-[17px] text-gray-500'>
            <button onClick={() => dispatch(changePage({type: 'HOME'}))} className={`${page === 'home' && 'text-black'}`}>Вопросы</button>
            <button className={`${page === 'themes' && 'text-black'}`} onClick={() => dispatch(changePage({type: 'THEMES'}))}>Обсуждения</button>
            <button onClick={() => dispatch(changeSupport({type: false}))}>Поддержка</button>
            <button onClick={() => dispatch(changePage({type: 'ABOUT'}))} className={`${page === 'about' && 'text-black'}`}>Об институте</button>
        </nav>
        <input className='text-[20px] outline-gray-400 border-[2px] w-[400px] py-[5px] px-[10px]' placeholder='найти вопрос' type="text" />
        <button className='bg-red-500 text-white py-[9px] px-[40px] rounded-sm'>Выйти</button>
    </header>
  )
}
