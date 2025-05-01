import { Modal } from '@mui/material'
import { Button } from 'antd'
import React, { useState } from 'react'
import { useCreateUser } from '../../hooks/hooks'

type Props = {
    modal: boolean,
    setModal: any
}

export const UserCreate: React.FC<Props> = ({modal, setModal}) => {

    const [role, setRole] = useState<'Студент' | 'Абитуриент' | 'Админ'>('Абитуриент')

    const {createUser, setEmail, setFullName, setSpeciality, setPassword} = useCreateUser(setModal, role)

    return (
        <Modal
            className='flex justify-center items-center w-full h-full pb-[30%]'
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <div className='w-[400px] bg-slate-200 p-[15px]'>
                <h2 className='pb-[10px]'>Добавление пользователя</h2>
                <button className={`${role === 'Абитуриент' ? 'bg-white' : 'bg-slate-200'} py-[6px] border-[2px] border-white w-[100px]`}
                    onClick={() => setRole('Абитуриент')}>Абитуриент
                </button>
                <button className={`${role === 'Студент' ? 'bg-white' : 'bg-slate-200'} py-[6px] border-[2px] border-white w-[100px]`}    
                    onClick={() => setRole('Студент')}>Студент
                </button>
                <button className={`${role === 'Админ' ? 'bg-white' : 'bg-slate-200'} py-[6px] border-[2px] border-white w-[100px]`}    
                    onClick={() => setRole('Админ')}>Админ
                </button>
                <div className='grid gap-[10px] pt-[10px]'>
                    <input onChange={e => setFullName(e.target.value)} className='outline-none p-[3px]' type="text" placeholder='имя'/>
                    <input onChange={e => setSpeciality(e.target.value)} className={`outline-none p-[3px] ${role === 'Студент' ? 'flex' : 'hidden'}`} type="text" placeholder='специальность'/>
                    <input onChange={e => setEmail(e.target.value)}  className='outline-none p-[3px]' type="text" placeholder='почта'/>
                    <input onChange={e => setPassword(e.target.value)}  className={`outline-none p-[3px] ${role === 'Админ' ? 'flex' : 'hidden'}`} type="text" placeholder='пароль'/>
                </div>
                <div className='flex justify-end pt-[10px]'>
                    <Button onClick={() => createUser()}>создать</Button>
                </div>
            </div>
        </Modal>
    )
}
