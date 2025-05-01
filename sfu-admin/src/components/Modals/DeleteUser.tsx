import { Modal } from '@mui/material'
import React from 'react'
import { useDeleteUser } from '../../hooks/hooks'

type Props = { 
    modal: boolean,
    setModal: any,
    setDeleteId: any,
    deleteId: string
}

export const DeleteUser: React.FC<Props> = ({modal, setModal, setDeleteId, deleteId}) => {

    const {deleteUser} = useDeleteUser(setModal, setDeleteId, deleteId)

    return (
        <Modal className='flex justify-center items-center w-full h-full pb-[30%]'
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className='w-[400px] bg-slate-200 p-[15px] px-[20px] border-none outline-none'>
                <h1>Вы уверены, что хотите удалить пользователя</h1>
                <div className='flex justify-end gap-[10px] mt-[10px]'>
                    <button onClick={() => setModal(false)} className='px-[10px] py-[3px] bg-white rounded-sm border-[2px] hover:hover:border-black delay-75'>нет</button>
                    <button onClick={() => deleteUser()} className='px-[10px] py-[3px] bg-white rounded-sm border-[2px] hover:hover:border-black'>да</button>
                </div>
            </div>
        </Modal>
    )
}
