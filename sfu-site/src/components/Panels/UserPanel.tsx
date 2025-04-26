import React, { useEffect, useRef, useState } from 'react'
import User from '../../images/user.jpg'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeAvatar, sendAvatar } from '../../redux/auth'
import { isUser } from '../../utils/checkValue'
import { Skeleton as SkeletAvatar } from '@mui/joy'; 
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'

export const UserPanel = () => {

    const {state} = useAppSelector(val => val.auth)
    const ref = useRef<null | HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const token = localStorage.getItem('JWTtoken')
    
    const {value, status} = useAppSelector(el => el.auth.userAvatar.img)
    const meStatus = useAppSelector(el => el.auth.status)
  
    const [previousValuePath, setPreviousValuePath] = useState<null | string>(null);
  
    useEffect(() => {
        if (value !== null && value !== previousValuePath && isUser(state)) {
            console.log(value)
            dispatch(changeAvatar({ id: state._id, avatar: value }));
  
            setPreviousValuePath(value);
        }
    }, [value, state, dispatch, previousValuePath]); 
  
    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('check', e);
    
      const input = e.target as HTMLInputElement;
    
      if (!input.files || input.files.length === 0) {
        console.log('Загрузите, пожалуйста, картинку');
        return;
      }
    
      const file = input.files[0]; // Получаем первый файл из объекта
    
      // Замените `object` на `FormData`
      const formData = new FormData();
      formData.append('file', file); // Добавляем файл, а не input
  
        dispatch(sendAvatar(formData));
      }
  
    const [showButton, setShowButton] = useState<boolean>(false);

  return (
    <>
        {<aside className='bg-slate-100 py-[20px] px-[60px] flex flex-col justify-center items-center text-center'>
        <div className='grid place-items-center break-all w-[150px]'>
            {status === 'loading' ? <SkeletAvatar variant="circular" width={130} height={130} /> 
            : <div className='relative flex flex-col justify-center items-center'>
                {meStatus === 'loading' ? <SkeletAvatar variant="circular" width={130} height={130} /> : <img
                  className='shadow-custom mt-2 rounded-full object-cover w-[130px] h-[130px]' width={130} height={130}
                  src={isUser(state) && state.avatarUrl ? state.avatarUrl : User}
                  alt='userLogo'
                  onMouseOver={() => setShowButton(true)}
                  onMouseOut={() => setShowButton(false)}
                />}
                <button
                  onClick={() => ref.current?.click()}
                  className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[15px] whitespace-nowrap'
                  style={{ display: showButton && isUser(state) && !state.ban ? 'block' : 'none' }}
                  onMouseOver={() => setShowButton(true)}
                  onMouseOut={() => setShowButton(false)}
                >
                  Смена аватарки
                </button>
              </div>
            }
              <input onChange={e => changeImage(e)} ref={ref} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
            </div>
            <h1 className='text-center pt-[5px] text-xl break-words max-w-[150px] max-[1100px]:text-[18px] overflow-hidden whitespace-nowrap overflow-ellipsis'>
              {meStatus === 'loading' ? <Skeleton variant="text" sx={{ fontSize: '30rem' }} /> : isUser(state) ? state.fullName : 'Гость'}
            </h1>
        </aside>
        }
        {token ? <Link to={`/profile/${isUser(state) && state._id}`} className='bg-slate-100 py-[10px] flex justify-center shadow-btn-shadow'>
          Профиль
        </Link> : <Link to={`/login`} className='bg-slate-100 py-[10px] flex justify-center shadow-btn-shadow'>
          Войти
        </Link>}
    </>
  )
}
