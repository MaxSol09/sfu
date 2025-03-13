import React, { useEffect, useState } from 'react'
 import Sfu from '../images/sfu.jpeg'
 import Logo from '../images/logo.png'
 import axios from 'axios'
 import { Link, useNavigate } from 'react-router-dom'
 import { getVkUser, loginFetch } from '../redux/auth'
 import { isUser } from '../utils/checkValue'
 import { useAppDispatch, useAppSelector } from '../redux/hooks'
 import { useForm } from 'react-hook-form'
import * as VKID from '@vkid/sdk'
 
 export const Login: React.FC = () => {
 
   const navigate = useNavigate()
 
   const dispatch = useAppDispatch()
   const {state, status} = useAppSelector(el => el.auth)
 
   useEffect(() => {
       if (isUser(state)) {
           if(state.token){
               localStorage.setItem('JWTtoken', state.token)
               axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
               navigate('/home');
           }
           else{
               return
           }
       }
 
   }, [state, dispatch, navigate]); 

 
   const appId = 53108749
   const redirectUri = 'https://sfu-counselor.onrender.com'; // Замените на URL вашего приложения


   VKID.Config.init({
    app: appId,
    redirectUrl: redirectUri,
    scope: 'email'
  });


  const [vkid, setVkid] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const initializeVKID = async () => {
      try {
        const vkidInstance = await VKID.Config.init({
          app: appId,
          redirectUrl: redirectUri,
          scope: 'email',
        });
        setVkid(vkidInstance);



          try {
            const user = await vkidInstance.get();
            console.log('User data:', user);
          } catch (error) {
            console.error('Error getting user info:', error);
          }
      } catch (error) {
        console.error('VKID init error:', error);
      }
    };

    initializeVKID();
  }, [appId, redirectUri]);

  const handleLogin = async () => {
    if (!vkid) {
      console.warn('VKID not initialized yet');
      return;
    }
    try {
      await vkid.login(); // Просто вызываем vkid.login() без аргументов
    } catch (error) {
      console.error('Login error:', error);
    }
  };

 
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
       <img alt='sfu-logo' className='w-1/2 bg-img' src={Sfu}/>
       <div className='flex flex-col justify-center w-1/2 items-center'>
         <img className='w-[200px]' src={Logo} alt="" />
         <h1 className='my-[20px] text-[30px] text-slate-500'>С возвращением!</h1>
         <button onClick={() => handleLogin()}>вк вход test</button>
         <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center space-y-[20px]'>
           <label className='grid text-[20px] justify-center gap-[5px]' >
               Электронная почта
               <input {...register('email', {
                       required: 'поле обязательно'
                   })} type="text" className='rounded-md px-[10px] w-[380px] py-[10px] text-[18px] text-blue-500 border-gray-400 outline-none border-2 focus:border-blue-600'/>
               {errors?.email && <p className='text-lg text-rose-600'>Поле обязательно!</p>}
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
                 {errors?.password && <p className='text-lg text-rose-600'>{errors?.password?.message || 'Ошибка!'}</p>}
                 {status === 'errors' && <p className='text-lg text-rose-600'>Ошибка при вводе пароля или почты</p>}
           </label>
           <button className='px-[90px] py-[10px] text-[23px] bg-blue-500 rounded-xl text-white hover:bg-lime-500 hover:shadow-md transition-all delay-75 flex justify-center m-auto' type='submit'>Войти</button>
             <div className='flex gap-[8px] items-center justify-center'>
               <h2 className=' text-center text-[16px]'>
                 Нет аккаунта? 
               </h2>
               <Link to={'/register'} className='text-center text-blue-600 text-[18px]' >Регистрация</Link>
           </div>
         </form>
         </div>
     </div>
   )
 }