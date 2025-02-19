import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'
import { Modal } from '@mui/material'
import { useComplaintsStore } from '../../zustand/complaints'

type Props = {
    setModal: any,
    modal: boolean,
    userID: string,
    page: 'ban' | 'users',
    autherID: string
}

export const UserBan: React.FC<Props> = ({setModal, modal, userID, page, autherID}) => {

    const [text, setText] = useState<string>('')

    const mutateDeleteComplaint = useMutation(usersService.deleteComplaint, {
        mutationKey: ['deleteComplaint', userID, autherID]
    })

    const mutateBan = useMutation(usersService.banUser, {
        mutationKey: ['banUser']
    })

    const deleteComplaintFn = useComplaintsStore(el => el.deleteComplaint)


    const banUser = (type: 'ban' | 'unban') => {
        if(type === 'unban'){
            mutateBan.mutate({userID, type})
        }
        else{
            mutateBan.mutate({userID, text, type})
            mutateDeleteComplaint.mutate({userID, autherID})
        }
    }

    useEffect(() => {
        if(mutateDeleteComplaint.isSuccess){
            deleteComplaintFn(mutateDeleteComplaint.data.data)
        }
    }, [mutateDeleteComplaint.isSuccess])

    const deleteComplaint = useComplaintsStore(el => el.deleteComplaint)

    
    useEffect(() => {
        if(mutateBan.isSuccess){
            setModal(false)
            
            if(page === 'ban'){
                deleteComplaint({userID, autherID})
            }
        }
    }, [mutateBan.isSuccess])


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
