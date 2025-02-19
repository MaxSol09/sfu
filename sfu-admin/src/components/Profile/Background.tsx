import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { DeleteBg } from '../Modals/DeleteBg'
import { useUserStore } from '../../zustand/auth'
import { isUser } from '../../utils/checkValue'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'
import { useParams } from 'react-router-dom'
import Delete from '../../images/delete.png'
import Sfu from '../../images/sfu-bg.webp'

export const Background = () => {

    const sendBg = useUserStore(el => el.sendBg)
    const {id} = useParams()
    const user = useUserStore(el => el.user.value)

      const mutateBacground = useMutation(usersService.changeBackground, {
        mutationKey: ['changeBgKey222', id]
      })
    
      const mutateSendBackground = useMutation(usersService.sendBackground, {
        mutationKey: ['sendBg12124142']
      })
    
      useEffect(() => {
        if(mutateSendBackground.isSuccess){
          sendBg(mutateSendBackground.data.data.path)
        }
      }, [mutateSendBackground.isSuccess])

      const bgRef = useRef<HTMLInputElement | null>(null)
    
      const bgValue = useUserStore(el => el.userBackground.value)
    
      const [bgPath, setBgPath] = useState<string | null>(null)
    

      const [modalDeleteBg, setModalDeleteBg] = useState<boolean>(false)
    
      useEffect(() => {
          if (bgValue !== bgPath && bgValue !== null && isUser(user)) { //в данной строчке проверяю что имя картинки не равно той на которую мы меняли в прошлый раз
            console.log('egeew')
            mutateBacground.mutate({ id: user._id, backgroundProfile: bgValue }); //меняю задний фон у определенного юзера
      
            setBgPath(bgValue)
          }
          else{
            return
          }
    
      }, [user, bgValue, bgPath]); 

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
        
          mutateSendBackground.mutate((formData)); //отправка картинки на сервер
        }

  return (
    <>
        {isUser(user) && <>
        <img alt='bg-image' className='w-full h-[200px] object-cover' src={user.backgroundProfile ? user.backgroundProfile : user.backgroundProfile ? user.backgroundProfile : Sfu}></img>
        <div className='absolute right-[15px] top-[15px] flex gap-[10px]'>
            <Button onClick={() => bgRef.current?.click()} >Смена фона</Button>
            <Button onClick={() => setModalDeleteBg(true)}>
                <img className='w-[25px]' alt='image-delete' src={Delete}></img>
            </Button>
        </div>
        <input onChange={e => changeBg(e)} ref={bgRef} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
        <DeleteBg modal={modalDeleteBg} setModal={setModalDeleteBg} id={id}/> </>}
    </>
  )
}
