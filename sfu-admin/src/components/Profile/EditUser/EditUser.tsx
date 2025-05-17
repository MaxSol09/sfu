import React, { useState } from 'react'
import { isUser } from '../../../utils/checkValue'
import { useUserStore } from '../../../zustand/auth'
import { EditText } from './EditText'

export const EditUser: React.FC = () => {
  
  const user = useUserStore(el => el.user.value)
  const [changeText, setChangeText] = useState(false)

  return (
    <>
    {isUser(user) && <div className={`${changeText ? 'pt-[35px]' : 'pt-[55px]'} pb-[30px] bg-slate-100 px-[40px] shadow-lg`}>
        <div  className=' flex justify-between'>
          <div className={`${!changeText && 'w-full'}`}> 
              <p style={{display: changeText ? 'none' : 'block'}} className='text-gray-600 pr-2 text-[18px] w-full break-words'>Описание:<span className='pl-[10px]'>{user.text ? user.text : 'отсутствует'}</span> </p>
          <div className='flex gap-[30px] w-full'>
            <p style={{display: changeText ? 'none' : 'block'}} className='pt-[10px]'>Роль: {user.role}</p>
            {!changeText && <div className='flex pt-[10px] items-center gap-[5px] flex-wrap w-2/3'>Специальность: 
              {user.speciality ? user.speciality.map((s, index) => <p>{s}{user.speciality[index+1] ? ',' : ''}</p>) : 'отсутствует'}</div>}
          </div>
        </div>
        <EditText setChangeText={setChangeText} changeText={changeText}/>
        </div>
      </div>}
    </>
    )
}
