import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isUser } from '../../utils/checkValue';
import { changeAvatar, sendAvatar } from '../../redux/auth';
import { Skeleton as SkeletAvatar } from '@mui/joy'; 
import User from '../../images/user.jpg'
import Delete from '../../images/del.png'
import { DeleteAvatar } from '../Modals/DeleteAvatar';

export const AvatarProfile: React.FC = () => {

  const [showButton, setShowButton] = useState<boolean>(false);
  const ref = useRef<null | HTMLInputElement>(null)

  const [previousValuePath, setPreviousValuePath] = useState<null | string>(null);

  const [modalDeleteAvatar, setModalDeleteAvatar] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const user = useAppSelector(el => el.auth.user.value)
  const state = useAppSelector(el => el.auth.state)
  
  const {value, status} = useAppSelector(el => el.auth.userAvatar.img)

  useEffect(() => {
        if (value !== null && value !== previousValuePath && isUser(state)) {
            console.log(value)
            dispatch(changeAvatar({ id: state._id, avatar: value }));
  
            setPreviousValuePath(value);
        }
  
    }, [value, dispatch, state, previousValuePath]); 

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  
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
  

  return (
    <>  
      {isUser(state) && isUser(user) && <div className='relative bg-white rounded-full'>
          {status === 'loading' ? <SkeletAvatar variant="circular" width={130} height={130}/> :
            <img src={state._id === user._id && state.avatarUrl ? state.avatarUrl : user.avatarUrl ? user.avatarUrl : User} alt="avatar" className='rounded-full w-[130px] h-[130px] object-cover border-gray-300 border-[3px]' 
              onMouseOver={() => setShowButton(true)}
              onMouseOut={() => setShowButton(false)}
            />
          }
          <button
            onClick={() => ref.current?.click()}
            className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[15px] whitespace-nowrap'
            style={{ display: showButton && state._id === user._id && !user.ban ? 'block' : 'none' }}
            onMouseOver={() => setShowButton(true)}
            onMouseOut={() => setShowButton(false)}
          >
            Смена аватарки
          </button>
          <button onClick={() => setModalDeleteAvatar(true)} 
                className={`absolute bottom-[2px] right-[2px] bg-white p-[2px] shadow-xl rounded-[5px] z-50 ${user.avatarUrl ? 'flex' : 'hidden'}`}>
                <img className='w-[25px]' alt='image-delete' src={Delete}></img>
          </button>
        </div>}
        <input onChange={e => changeImage(e)} ref={ref} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
        <DeleteAvatar modal={modalDeleteAvatar} setModal={setModalDeleteAvatar}/>
    </>
  )
}
