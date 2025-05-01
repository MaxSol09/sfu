import { Button } from 'antd'
import React from 'react'
import { Modal } from '@mui/material'
import { useBan } from '../../hooks/hooks'

type Props = {
    setModal: any,
    modal: boolean,
    userID: string,
    page: 'ban' | 'users',
    autherID: string
}

export const UserBan: React.FC<Props> = ({setModal, modal, userID, page, autherID}) => {

    const {banUser, setText} = useBan(setModal, userID, autherID, page)

    return (
        <Modal
            className='flex justify-center items-center w-full h-full pb-[30%]'
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <div className='w-[400px] bg-slate-200 p-[15px] outline-none'>
                <h2 className='pb-[10px]'>Блокирование пользователя</h2>
                <textarea onChange={e => setText(e.target.value)} className='outline-none p-[3px] w-full min-h-[200px] max-h-[200px]' placeholder='причина бана...'>
                </textarea>
                <div className='flex justify-between pt-[10px]'>
                    <Button onClick={() => setModal(false)}>отмена</Button>
                    <div className='flex gap-[10px]'>
                        <Button onClick={() => banUser('unban')}>разбан</Button>
                        <Button onClick={() => banUser('ban')}>бан</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
