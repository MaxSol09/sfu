import React from 'react'
import { isUser } from '../../utils/checkValue'
import { Router } from '../../Router'
import Warn from '../../images/warn.png'
import { useGetMe } from '../../hooks/hooks'
import { Login } from './Login'
import { Link } from 'react-router-dom'

export const Loading: React.FC = () => {

    const url = document.location.href
    const check = url === 'http://localhost:5173/login'

    const {isLoading, isError, isSuccess, data} = useGetMe()

    return (
        <>
            {!check ? <>{isSuccess && isUser(data) && data.role === 'Админ' ? <Router /> :         
                <div className='w-full min-h-screen flex flex-col items-center justify-center space-y-4 pb-[30%]'>
                    <h1 className='text-xl font-semibold'>Проверка доступа</h1>
                    {isLoading && <p>Загрузка...</p>}
                    {isError && <div className='grid items-center place-items-center'>
                        <img className='w-[50px]' src={Warn}/>
                        <p>У вас нет доступа</p>
                    </div>}
                    <Link className='text-blue-500' to={'/login'}>Перейти на страницу с входом</Link>
                </div>
            }</> : <Login />}
        </>
    )
}
