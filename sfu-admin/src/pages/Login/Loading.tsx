import React, { useEffect } from 'react'
import { isUser } from '../../utils/checkValue'
import { useUserStore } from '../../zustand/auth'
import { useQuery } from 'react-query'
import { usersService } from '../../service/usersService'
import { Router } from '../../Router'
import { Spin } from 'antd'
import Warn from '../../images/warn.png'
import { Link } from 'react-router-dom'

export const Loading: React.FC = () => {

    const {state} = useUserStore(el => el)
    const getMeFn = useUserStore(el => el.getMe)
  
    const {isSuccess, isLoading, data} = useQuery({
      queryKey: ['userKey'],
      select: data =>  data.data,
      queryFn: usersService.getMe
    })
  
    console.log(isLoading)
  
    useEffect(() => {
      if(isSuccess){
        getMeFn(data)
      }
    }, [isLoading, isSuccess])

    const url = document.location.href

    const check = url === 'http://localhost:5173/login'

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
