import React, { useEffect, useState } from 'react'
import Sfu from '../../images/sfu.jpeg'
import Sfu2 from '../../images/sfu2.jpeg'
import Logo from '../../images/logo.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { isUser } from '../../utils/checkValue'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RegistrationVk } from './RegistrationVk'
import { NotificationRegistration } from '../../components/Notifications/NotificationRegistration'
import { resetStatusRegister } from '../../redux/auth'

 
 export const Registration: React.FC = () => {
 
   const navigate = useNavigate()
 
   const dispatch = useAppDispatch()
   const {state} = useAppSelector(el => el.auth)

   useEffect(() => {
    dispatch(resetStatusRegister())
   }, [])
 
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

   const [width, setWidth] = useState(window.innerWidth);

   useEffect(() => {
     const handleResize = () => {
       setWidth(window.innerWidth);
     };
 
     window.addEventListener('resize', handleResize);
 
     // Cleanup the event listener on component unmount
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
 
   return (
    <div className={`h-[100vh] flex w-full bg-cover`} style={{backgroundImage: width < 700 ? `url(${Sfu2})` : ''}}>
        <img alt='sfu-logo' className='w-1/2 bg-img max-[700px]:hidden' src={Sfu} />
        <div className='flex flex-col mt-[20vh] w-1/2 items-center max-[700px]:w-full'>
          <div className='w-full flex flex-col justify-center items-center max-[700px]:bg-white max-[700px]:shadow-custom-rounded max-[400px]:w-[80%] max-[700px]:w-[70%] max-[700px]:py-[30px]'>
            <img className='w-[200px] max-[700px]:w-[150px]' src={Logo} alt="логотип" />
            <h1 className='my-[20px] text-[30px] text-slate-500 max-[700px]:text-[25px]'>Регистрация</h1>
            <div className='flex flex-col gap-[10px] w-full min-[1100px]:w-[80%] items-center'>
                <RegistrationVk />
            </div>
            <div className='flex gap-[8px] items-center justify-center mt-[20px]'>
                <h2 className='text-center text-[16px]'>Есть аккаунт?</h2>
                <Link to={'/login'} className='text-center text-blue-600 text-[18px]'>Вход</Link>
            </div>
          </div>
        </div>
        <NotificationRegistration />
      </div>
      )
    }