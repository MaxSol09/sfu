import { Modal } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { isUser } from '../../utils/checkValue'
import { changeBackground } from '../../redux/auth'

type Props = {
    setModal: any,
    modal: boolean
}

export const DeleteBg: React.FC<Props> = ({modal, setModal}) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(el => el.auth.state)

    const deleteBgFn = () => {
        if(!isUser(state)) return
    
        dispatch(changeBackground({ id: state._id, backgroundProfile: '' }))
          
        setModal(false)
    }

  return (
    <Modal open={modal} onOk={() => deleteBgFn()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
        <p className='text-xl pb-3'>Вы уверены, что хотите удалить фон?</p>
    </Modal>
  )
}
