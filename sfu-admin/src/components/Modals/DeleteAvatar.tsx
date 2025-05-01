import React from 'react'
import { Modal } from 'antd'
import { useDeleteAvatar } from '../../hooks/hooks'

type Props = { 
    setModal: any,
    modal: boolean
}

export const DeleteAvatar: React.FC<Props> = ({setModal, modal}) => {

  const {deleteAvatar} = useDeleteAvatar(setModal)

  return (
    <Modal open={modal} onOk={() => deleteAvatar()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
        <p className='text-xl pb-3'>Вы уверены, что хотите удалить аватарку?</p>
    </Modal>
  )
}
