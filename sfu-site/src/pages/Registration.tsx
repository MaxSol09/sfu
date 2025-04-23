import React, { useEffect, useState } from 'react'
 import Sfu from '../images/sfu.jpeg'
 import Logo from '../images/logo.png'
 import axios from 'axios'
 import { Link, useNavigate } from 'react-router-dom'
 import { getVkUser, loginFetch } from '../redux/auth'
 import { isUser } from '../utils/checkValue'
 import { useAppDispatch, useAppSelector } from '../redux/hooks'
 import { useForm } from 'react-hook-form'

 
 export const Registration: React.FC = () => {
 
   const navigate = useNavigate()
 
   const dispatch = useAppDispatch()
   const {state, status} = useAppSelector(el => el.auth)
 
   useEffect(() => {
       if (isUser(state)) {
           if(state.token){
               localStorage.setItem('JWTtoken', state.token)
               axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
               navigate('/');
           }
           else{
               return
           }
       }
 
   }, [state, dispatch, navigate]); 
 
   const appId = '53108749'; // Замените на ваш client_id
   const redirectUri = 'https://sfu-86v5.vercel.app/register'; // Замените на URL вашего приложения
 
   useEffect(() => {
     // Получение параметров из URL hash (после редиректа)
     const hash = window.location.hash.substring(1); // Убираем '#'
     const params = new URLSearchParams(hash);
 
     console.log(params.get('email'))
 
     const accessToken = params.get('access_token');
     const userId = params.get('user_id');
     const email = params.get('email')
 
     if (accessToken && userId) {
       // Сохраняем токен (например, в localStorage)
       localStorage.setItem('vk_userId', userId);
 
       // Получаем данные пользователя
       getUserData(accessToken, userId, email);
 
       // Очищаем hash из URL (чтобы не было видно в истории браузера)
       window.history.replaceState({}, document.title, window.location.pathname);
     }
   }, []);
 
   // Функция для получения данных пользователя (с использованием VK API)
   const getUserData = async (accessToken: string, userId: string, email: string | null) => {
     try {
       dispatch(getVkUser({token: accessToken, vkID: userId, email: email}))
       console.log('handle log data >>> ', accessToken) 
     } catch (error) {
       console.error('Ошибка при получении данных пользователя:', error);
     }
   };
 
   const handleLogin = () => {
     const scope = 'email,offline'; // Укажите необходимые разрешения
     window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&v=5.199`;
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
         <button onClick={() => handleLogin()} id="VKIDSDKAuthButton" className="VkIdWebSdk__button VkIdWebSdk__button_reset">
            <div className="VkIdWebSdk__button_container">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54648 4.54648C3 6.09295 3 8.58197 3 13.56V14.44C3 19.418 3 21.907 4.54648 23.4535C6.09295 25 8.58197 25 13.56 25H14.44C19.418 25 21.907 25 23.4535 23.4535C25 21.907 25
                    19.418 25 14.44V13.56C25 8.58197 25 6.09295 23.4535 4.54648C21.907 3 19.418 3 14.44 3H13.56C8.58197 3 6.09295 3 4.54648 4.54648ZM6.79999 10.15C6.91798 15.8728 9.92951 19.31 14.8932 19.31H15.1812V16.05C16.989 16.2332 18.3371
                    17.5682 18.8875 19.31H21.4939C20.7869 16.7044 18.9535 15.2604 17.8141 14.71C18.9526 14.0293 20.5641 12.3893 20.9436 10.15H18.5722C18.0747 11.971 16.5945 13.6233 15.1803 13.78V10.15H12.7711V16.5C11.305 16.1337 9.39237 14.3538 9.314 10.15H6.79999Z" fill="white"/>
                </svg>
                Войти с VK ID
            </div>
        </button>
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