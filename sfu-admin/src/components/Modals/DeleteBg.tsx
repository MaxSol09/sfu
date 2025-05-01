import { Modal } from 'antd'
import React from 'react'
import { useDeleteBackground } from '../../hooks/hooks'

type Props = {
    modal: boolean,
    setModal: any,
    id: any
}

export const DeleteBg: React.FC<Props> = ({modal, setModal, id}) => {

    const {deleteBackground} = useDeleteBackground(setModal, id)

    return (
        <Modal open={modal} onOk={() => deleteBackground()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
            <p className='text-xl pb-3'>Вы уверены, что хотите удалить фон?</p>
        </Modal>
    )
}
