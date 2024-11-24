import React, { useEffect, useRef, useState } from 'react'
import User from '../images/user.jpg'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { Skeleton } from 'antd'
import { changeAvatar, sendAvatar } from '../redux/auth.ts'
import { isUser } from '../utils/checkValue.ts'

export const Panel = () => {

  const {state, status} = useAppSelector(val => val.auth)
  const ref = useRef(null)
  const dispatch = useAppDispatch()
  
  const {value} = useAppSelector(el => el.auth.userAvatar.img)

  const [previousValuePath, setPreviousValuePath] = useState(null);

  console.log(value);

  useEffect(() => {
      if (value !== null && value !== previousValuePath && isUser(state)) {
          console.log(value)
          dispatch(changeAvatar({ id: state._id, avatar: value }));

          setPreviousValuePath(value);
      }
  }, [value, state, dispatch, previousValuePath]); 

  const changeImage = (e) => {
    console.log('check', e);
  
    const input = e.target
  
    if (!input.files || input.files.length === 0) {
      console.log('Загрузите, пожалуйста, картинку');
      return;
    }
  
    const file = input.files[0]; // Получаем первый файл из объекта
  
    // Замените `object` на `FormData`
    const formData = new FormData();
    formData.append('file', file); // Добавляем файл, а не input
  
    console.log(typeof formData);

      dispatch(sendAvatar(formData));
    }

  return (
    <div className='grid fixed left-[100px] top-[110px] py-[20px] gap-[20px]'>
        <div className='bg-slate-100 py-[15px] pl-[20px] text-[17px]'>
            <h1 className='text-[18px] mb-[10px]'>Популярные тэги</h1>
            <p>#стипендия</p>
            <p>#поступление</p>
            <p>#баллы</p>
            <p>#кафедры</p>
            <p>#мероприятия</p>
        </div>
        { state._id ? <div className='bg-slate-100 py-[20px] px-[60px] flex flex-col justify-center items-center text-center'>
              <div className='grid justify-center'>
                <img className='shadow-custom mt-2 w-[130px] h-[130px] rounded-full' src={state.avatarUrl ? state.avatarUrl : User} alt='userLogo'/>
              </div>
              <h1 className='text-center pt-[5px] text-xl'>{state.fullName}</h1>
        </div> : <div className='bg-slate-100 w-[250px] px-[30px] py-[20px]'><Skeleton active/></div>
        }
        <button className='bg-slate-100 py-[10px] shadow-btn-shadow'>Профиль</button>
    </div>
  )
}
