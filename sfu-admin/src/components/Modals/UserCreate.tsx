import { Modal } from '@mui/material'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'
import { useUserStore } from '../../zustand/auth'

type Props = {
    modal: boolean,
    setModal: any
}

export const UserCreate: React.FC<Props> = ({modal, setModal}) => {

    const [role, setRole] = useState<'Студент' | 'Абитуриент' | 'Админ'>('Абитуриент')
    const [speciality, setSpeciality] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')

    const addUser = useUserStore(el => el.addUser)

    const {mutate, isSuccess, data} = useMutation(usersService.registerUser, {
        mutationKey: ['register']
    })

    useEffect(() => {
        if(isSuccess){
            addUser(data.data)
            setModal(false)
        }
    }, [isSuccess])

    const createUser = () => {
        if(!fullName || !email || (role === 'Админ' && password.length < 6)){
            return alert('Заполни поля')
        }
        
        mutate({
            fullName,
            speciality,
            email,
            role,
            password
        })
    }


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
