import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { isUser } from '../../utils/checkValue'
import { changeBackground, sendBackground } from '../../redux/auth'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Sfu from '../../images/sfu-bg.webp'
import Delete from '../../images/del.png'
import { DeleteBg } from '../../components/Modals/DeleteBg'

export const BackgroundProfile = () => {

      const bgRef = useRef<HTMLInputElement | null>(null)
      const bgValue = useAppSelector(el => el.auth.userBackground.img.value)
    
      const [bgPath, setBgPath] = useState<string | null>(null)
      const [modalDeleteBg, setModalDeleteBg] = useState<boolean>(false)

      const state = useAppSelector(el => el.auth.state)
      const user = useAppSelector(el => el.auth.user.value)
    

    const dispatch = useAppDispatch()

      useEffect(() => {

          if (bgValue !== bgPath && bgValue !== null && isUser(state)) { //в данной строчке проверяю что имя картинки не равно той на которую мы меняли в прошлый раз
      
            dispatch(changeBackground({ id: state._id, backgroundProfile: bgValue })); //меняю задний фон у определенного юзера
      
            setBgPath(bgValue)
          }
    
      }, [state, dispatch, bgValue, bgPath]); 

    const changeBg = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      
      if (!input.files || input.files.length === 0) {
        console.log('Загрузите, пожалуйста, картинку');
        return;
      }
    
      const file = input.files[0]; // Получаем первый файл из объекта

    
      // Замените `object` на `FormData`
      const formData = new FormData();
      formData.append('file', file); // Добавляем файл, а не input
    
      dispatch(sendBackground(formData)); //отправка картинки на сервер
    }

  return (
    <>
      {isUser(user) && <>
      <img alt='bg-image' className='w-full h-[200px] object-cover' src={user.backgroundProfile ? user.backgroundProfile : Sfu}></img>
      <div className='absolute right-[15px] top-[15px] flex gap-[10px]'>
          <Button onClick={() => bgRef.current?.click()} style={{display: isUser(state) && state._id === user._id && !user.ban ? 'flex' : 'none'}}>
            Смена фона
          </Button>
          <Button style={{display: isUser(state) && state._id === user._id && !user.ban && state.backgroundProfile ? 'flex' : 'none'}} onClick={() => setModalDeleteBg(true)}>
              <img alt='image-delete' className='w-[23px]' src={Delete}></img>
          </Button>
      </div> 
      <input onChange={e => changeBg(e)} ref={bgRef} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
      <DeleteBg modal={modalDeleteBg} setModal={setModalDeleteBg}/>
      </>}
    </>
  )
}
