import React from 'react'
import { isUser } from '../../utils/checkValue'
import { useUserStore } from '../../zustand/auth'
import { Router } from '../../Router'
import { Spin } from 'antd'
import Warn from '../../images/warn.png'
import { useGetMe } from '../../hooks/hooks'

export const Loading: React.FC = () => {

    const {state} = useUserStore(el => el)

    const url = document.location.href
    const check = url === 'http://localhost:5173/login'

    const {isLoading} = useGetMe()

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center space-y-4 pb-[30%]'>
            <h1 className='text-xl font-semibold'>Проверка доступа</h1>
            {isLoading && !check ? <Spin /> : <img className='w-[100px]' src={Warn} alt='внимание'></img>}
                {isUser(state) && state.role === 'Админ' ? <Router /> : <p className={`${isLoading ? 'text-gray-400' : 'text-red-600'} `}> 
                    {isLoading ? 'Загрузка...' : 'У вас нет доступа'}
                </p>}
        </div>
    )
}
