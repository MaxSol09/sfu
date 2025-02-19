import React, { useEffect, useRef, useState } from 'react'
import User from '../../images/user.jpg'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Skeleton } from 'antd'
import { changeAvatar, sendAvatar } from '../../redux/auth'
import { isUser } from '../../utils/checkValue'
import { Skeleton as SkeletAvatar } from '@mui/joy'; 
import { Link } from 'react-router-dom'

export const UserPanel = () => {

    const {state} = useAppSelector(val => val.auth)
    const ref = useRef<null | HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    
    const {value, status} = useAppSelector(el => el.auth.userAvatar.img)
  
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
        {isUser(state) && state._id ? <div className='bg-slate-100 py-[20px] px-[60px] flex flex-col justify-center items-center text-center'>
        <div className='grid place-items-center break-all w-[150px]'>
            {status === 'loading' ? <SkeletAvatar variant="circular" width={130} height={130} /> 
            : <div className='relative flex flex-col justify-center items-center'>
                <img
                  className='shadow-custom mt-2 w-[130px] h-[130px] rounded-full object-cover'
                  src={state.avatarUrl ? state.avatarUrl : User}
                  alt='userLogo'
                  onMouseOver={() => setShowButton(true)}
                  onMouseOut={() => setShowButton(false)}
                />
                <button
                  onClick={() => ref.current?.click()}
                  className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[15px] whitespace-nowrap'
                  style={{ display: showButton && !state.ban ? 'block' : 'none' }}
                  onMouseOver={() => setShowButton(true)}
                  onMouseOut={() => setShowButton(false)}
                >
                  Смена аватарки
                </button>
              </div>
            }
              <input onChange={e => changeImage(e)} ref={ref} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
            </div>
            <h1 className='text-center pt-[5px] text-xl max-w-[150px] break-words text-ellipsis max-[1100px]:text-[18px]'>
              {state.fullName}
            </h1>
        </div> : <div className='bg-slate-100 w-[250px] px-[20px] py-[20px]'><Skeleton active/></div>
        }
        <Link to={`/profile/${isUser(state) && state._id}`} className='bg-slate-100 py-[10px] flex justify-center shadow-btn-shadow'>Профиль</Link>
    </>
  )
}
