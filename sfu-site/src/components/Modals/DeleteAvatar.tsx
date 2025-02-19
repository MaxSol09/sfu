import { Modal } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { isUser } from '../../utils/checkValue'
import { changeAvatar } from '../../redux/auth'

type Props = {
    setModal: any,
    modal: boolean
}

export const DeleteAvatar: React.FC<Props> = ({modal, setModal}) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(el => el.auth.state)

    const deleteAvatarFn = () => {
        if(!isUser(state)) return
    
        dispatch(changeAvatar({id: state._id, avatar: ''}))
          
        setModal(false)
    }

  return (
    <Modal open={modal} onOk={() => deleteAvatarFn()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
        <p className='text-xl pb-3'>Вы уверены, что хотите удалить аватарку?</p>
    </Modal>
  )
}
