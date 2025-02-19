import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { isUser } from '../../../utils/checkValue'
import { useAppSelector } from '../../../redux/hooks'
import { EditText } from './EditText'

export const EditUser: React.FC = () => {

    const [changeText, setChangeText] = useState(false)

    const state = useAppSelector(el => el.auth.state)
    const user = useAppSelector(el => el.auth.user.value)


    return (
      <>
          {isUser(user) && isUser(state) && <div className={`${changeText ? 'pt-[35px]' : 'pt-[55px]'} pb-[30px] bg-slate-100 px-[40px]`}>
              <div  className=' flex justify-between'>
                <div className={`${!changeText && 'w-2/3'}`}> 
                  <p style={{display: changeText ? 'none' : 'block'}} className='text-gray-600 pr-2 text-[18px] w-full break-words'>Описание:<span className='pl-[10px]'>{user.text ? user.text : 'отсутствует'}</span> </p>
                  <div className='flex gap-[30px]'>
                    <p style={{display: changeText ? 'none' : 'block'}} className='pt-[10px]'>Роль: {user.role}</p>
                    <p style={{display: !changeText && user.role === 'Студент' ? 'block' : 'none'}} className='pt-[10px]'>Специальность: {user.speciality ? user.speciality : 'отсутствует'}</p>
                  </div>
                </div>
                <Tooltip color='gray' title={user.ban && `Вы заблокированы. Причина - ${user.banText}`}>
                  <button disabled={user.ban ? true : false} onClick={() => setChangeText(true)} 
                  style={{padding: '5px 15px', fontSize: '16px', display: changeText || state._id !== user._id ? 'none' : 'flex', 
                  height: 'fit-content', transition: 'all 0.9s'}} 
                  className={`border-[1px] border-gray-300 rounded-[5px] ${user.ban ? 'bg-gray-300 opacity-55 border-gray-700' : 'bg-white hover:border-blue-400'}`}>
                    Редактировать
                  </button>
                </Tooltip>
                <EditText changeText={changeText} setChangeText={setChangeText}/>
              </div>
          </div>
          }
      </>
    )
}
