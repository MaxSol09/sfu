import { Modal } from '@mui/material'
import { Button } from 'antd'
import React from 'react'
import { useDeleteQuestion } from '../../hooks/hooks'

type Props = {
    modal: boolean,
    setModal: any,
    postId: string,
    setPostId: any
}

export const DeleteQuestion: React.FC<Props> = ({modal, setModal, postId, setPostId}) => {
    
    const {deleteQuestion} = useDeleteQuestion(setModal, postId, setPostId)

    return (
        <>
            <Modal className='flex justify-center items-center w-full h-full pb-[30%]'
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <div className='w-[400px] bg-slate-200 p-[15px] outline-none'>
                    <h2 className='pb-[10px]'>Вы уверены, что хотите удалить вопрос?</h2>
                    <div className='flex justify-end gap-[10px]'>
                    <Button onClick={() => setModal(false)}>нет</Button>
                    <Button onClick={() => deleteQuestion()}>да</Button>
                    </div>
                </div>
            </Modal>   
        </>
    )
}
