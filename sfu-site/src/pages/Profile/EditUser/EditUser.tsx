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
        {isUser(user) && <div className={`${changeText ? 'pt-[35px]' : 'pt-[55px]'} pb-[30px] bg-slate-100 px-[40px] max-[750px]:px-[20px]`}>
          <div className={`flex justify-between ${user.text && 'max-[700px]:flex-col'}`}>
            <div className={`${!changeText && 'w-2/3'} max-[700px]:w-full`}> 
              <p style={{display: changeText ? 'none' : 'block'}} className='text-gray-600 pr-2 text-[18px] w-full'>
                Описание:<span className='pl-[10px] break-words'>{user.text ? user.text : 'отсутствует'}</span> 
              </p>
            </div>
            <Tooltip color='gray' title={user.ban && `Вы заблокированы. Причина - ${user.banText}`}>
              <div className='flex max-[700px]:justify-end'>
                <button disabled={user.ban ? true : false} onClick={() => setChangeText(true)} 
                  style={{padding: '5px 15px', fontSize: '16px', display: isUser(state) && state._id === user._id && !changeText ? 'flex' : 'none', 
                  height: 'fit-content', transition: 'all 0.9s'}} 
                  className={`border-[1px] border-gray-300 rounded-[5px] ${user.ban ? 'bg-gray-300 opacity-55 border-gray-700' : 'bg-white hover:border-blue-400'}`}>
                    Редактировать
                </button>
              </div>
            </Tooltip>
          </div>
          <EditText changeText={changeText} setChangeText={setChangeText}/>
          <div className='flex gap-[30px] max-[600px]:gap-[10px] max-[430px]:text-[15px] max-[820px]:grid max-[820px]:gap-0'>
            <p style={{display: changeText ? 'none' : 'block'}} className='pt-[10px]'>Роль: {user.role}</p>
            <div style={{display: !changeText && user.role === 'Студент' ? 'flex' : 'none'}} className='gap-[5px] pt-[10px] max-[820px]pt-[5px] flex-wrap w-2/3 max-[820px]:w-full'>
              Специальность: {user.speciality.length ? user.speciality.map((s, index) => (
                <p key={index}>{s}{user.speciality[index + 1] ? ',' : ''}</p>
              )) : 'отсутствует'}
            </div>
          </div>
        </div>}
      </>
    )
}
