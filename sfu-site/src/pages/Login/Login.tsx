import React, { useEffect } from 'react'
 import Sfu from '../../images/sfu.jpeg'
 import Logo from '../../images/logo.png'
 import axios from 'axios'
 import { Link, useNavigate } from 'react-router-dom'
 import { loginFetch } from '../../redux/auth'
 import { isUser } from '../../utils/checkValue'
 import { useAppDispatch, useAppSelector } from '../../redux/hooks'
 import { useForm } from 'react-hook-form'
import { msalInstance } from '../..'
import { LoginVk } from './LoginVk'
import { LoginMicrosoft } from './LoginMicrosoft'

 
 export const Login: React.FC = () => {
 
   const navigate = useNavigate()
 
   const dispatch = useAppDispatch()
   const {state, status} = useAppSelector(el => el.auth)

   console.log(state)
 
   useEffect(() => {
       if (isUser(state)) {
           if(state.token){
              localStorage.setItem('JWTtoken', state.token)
              console.log(state.token)
              axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
              navigate('/');
           }
           else{
               return
           }
       }
   }, [state, dispatch, navigate]);
 
 
   const {
       register, 
       handleSubmit, 
       formState: {errors}
   } = useForm<{email: string, password: string}>()
 
   const submit = (data: {email: string, password: string}) => {
       dispatch(loginFetch(data))
   }
 
 
   console.log('vercel dayn')
 
   return (
     <div className='h-[100vh] flex w-full'>
       <img alt='sfu-logo' className='w-1/2 bg-img max-[700px]:hidden' src={Sfu}/>
       <div className='flex flex-col mt-[20vh] w-1/2 items-center max-[700px]:w-full'>
        <div className='w-full flex flex-col justify-center items-center max-[700px]:shadow-custom-rounded max-[700px]:w-[70%] max-[700px]:py-[30px]'>
          <img className='w-[200px] max-[700px]:w-[150px]' src={Logo} alt="logo" />
          <h1 className='my-[20px] text-[30px] text-slate-500 max-[700px]:text-[25px]'>С возвращением!</h1>
          <div className='flex flex-col gap-[10px] w-full min-[1100px]:w-[80%] items-center'>
            <LoginVk />
            <LoginMicrosoft />
          </div>
            <div className='flex gap-[8px] items-center justify-center mt-[20px]'>
                <h2 className=' text-center text-[16px]'>
                  Нет аккаунта? 
                </h2>
                <Link to={'/register'} className='text-center text-blue-600 text-[18px]' >Регистрация</Link>
            </div>
          </div>
        </div>
     </div>
   )
 }