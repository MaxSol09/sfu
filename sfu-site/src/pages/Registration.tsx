import React, { useEffect } from 'react'
import Sfu from '../images/sfu.jpeg'
import Logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { registerFetch } from '../redux/auth'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import axios from 'axios'
import { isUser } from '../utils/checkValue'
import { useForm } from 'react-hook-form'

export const Registration: React.FC = () => {

    const dispatch = useAppDispatch()
    const {state} = useAppSelector(el => el.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(isUser(state)){
            if(state.token){
                localStorage.setItem('JWTtoken', state.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
                navigate('/home');
            }
        }
    }, [state, navigate])

    const {
      register, 
      handleSubmit,
      formState: {errors}
    } = useForm<{email: string, password: string, fullName: string}>()

    const onSubmit = (data: {email: string, password: string, fullName: string}) => {
      console.log(data)

      dispatch(registerFetch({...data, role: 'Абитуриент'}))
    }


    /*/
      <div className='my-[20px] mt-[40px]'>
        <button style={{background: isStudent === 'Абитуриент' ? 'rgb(226 232 240)' : 'white'}} 
        onClick={() => setIsStudent('Абитуриент')} className='py-[6px] px-[10px] border-[2px] w-[190px]'>Абитуриент</button>
        <button style={{background: isStudent === 'Студент' ? 'rgb(226 232 240)' : 'white'}} 
        onClick={() => setIsStudent('Студент')} className='py-[6px] px-[10px] border-[2px] w-[190px]'>Студент</button>
      </div>
    /*/

    
    return (
        <div className='h-[100vh] flex w-full'>
        <img alt='sfu-logo' className='w-1/2 bg-img' src={Sfu}/>
        <div className='flex flex-col justify-center w-1/2 items-center'>
          <img className='w-[200px]' src={Logo} alt="logo" />
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center space-y-[20px] pt-[20px]'>
            <label className='grid text-[20px] justify-center gap-[5px]' >
                Электронная почта
                <input  {...register('email', {
                    required: true
                })} type="text" className='rounded-md px-[10px] w-[380px] py-[10px] text-[18px] text-blue-500 border-gray-400 outline-none border-2 focus:border-blue-600'/>
              {errors?.email && <p className='text-lg text-rose-600'>Поле обязательно!</p>}
            </label>
            <label className='grid text-[20px] justify-center gap-[5px]' >
                Имя
                <input {...register('fullName', {
                    required: 'Поле обязательно!',
                    minLength: {
                        value: 3,
                        message: 'Минимум 3 символа!'
                    },
                    maxLength: {
                        value: 15,
                        message: 'Максимум 15 символов!'
                    }
                })} type="text" className='rounded-md px-[10px] w-[380px] py-[10px] text-[18px] text-blue-500 border-gray-400 outline-none border-2 focus:border-blue-600'/>
                {errors?.fullName && <p className='text-lg text-rose-600'>{errors.fullName.message}</p>}
            </label>
            <label className='grid text-[20px] justify-center gap-[5px] pb-[10px]' >
                Пароль
                <input {...register('password', {
                    required: 'Поле обязательно!',
                    minLength: {
                        value: 5,
                        message: 'Минимум 5 символов!'
                    }
                })} type="text" className='rounded-md px-[10px] w-[380px] py-[10px] text-[18px] text-blue-500 border-gray-400 outline-none border-2 focus:border-blue-600'/>
              {errors?.password && <p className='text-lg text-rose-600'>{errors?.password?.message}</p>}
            </label>
            <button className=' w-3/4 py-[10px] text-[23px] bg-blue-500 rounded-xl text-white hover:bg-lime-500 hover:shadow-md transition-all delay-75 flex justify-center m-auto' type='submit'>Регистрирация</button>
              <div className='flex gap-[8px] items-center justify-center'>
                <h2 className=' text-center text-[16px]'>
                  Уже есть аккаунт? 
                </h2>
                <Link to={'/'} className='text-center text-blue-600 text-[18px]' >Вход</Link>
            </div>
          </form>
          </div>
    </div>
    )
}