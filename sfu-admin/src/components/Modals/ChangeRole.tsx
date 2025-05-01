import { Modal } from 'antd'
import React from 'react'
import { useChangeRole } from '../../hooks/hooks'

type Props = { 
    setModal: any,
    modal: boolean, 
    role: 'Абитуриент' | 'Студент' | 'Админ',
    userID: string
}

export const ChangeRole: React.FC<Props> = ({modal, setModal, role, userID}) => {

    const {mutate} = useChangeRole(setModal)

    return (
        <Modal open={modal} onOk={() => mutate({role, userID})} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
            <p className='text-xl pb-3'>Вы уверены, что хотите изменить роль данного пользователя?</p>
        </Modal>
    )
}
