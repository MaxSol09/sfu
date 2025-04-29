import { Button } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { isUser } from '../../utils/checkValue'
import { ModalBan } from '../../components/Modals/ModalBan'


export const Ban: React.FC = () => {
    const user = useAppSelector(el => el.auth.user.value)
    const state = useAppSelector(el => el.auth.state)

    const [modalBan, setModalBan] = useState<boolean>(false)

  return (
    <>
        { isUser(state) && isUser(user) && user._id !== state._id  &&
            <div className='absolute right-[15px] top-[15px] flex gap-[10px]'>
                <Button onClick={() => setModalBan(true)} className='custom-btn'>Пожаловаться</Button>
            </div>     
        }
        <ModalBan modal={modalBan} setModal={setModalBan}/>
    </>
  )
}
