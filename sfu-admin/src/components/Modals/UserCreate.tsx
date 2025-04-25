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

    const [isStudent, setIsStudent] = useState<boolean>(false)
    const [speciality, setSpeciality] = useState<string>('')
    const [email, setEmail] = useState<string>('')
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
        if(!fullName || !email){
            return alert('Заполни поля')
        }
        
        mutate({
            fullName,
            speciality,
            email,
            role: isStudent ? 'Студент' : 'Абитуриент'
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
                <button className={`${!isStudent ? 'bg-white' : 'bg-slate-200'} py-[6px] border-[2px] border-white w-[100px]`}
                onClick={() => setIsStudent(false)}>Абитуриент</button>
                <button onClick={() => setIsStudent(true)}  
                className={`${isStudent ? 'bg-white' : 'bg-slate-200'} py-[6px] border-[2px] border-white w-[100px]`}
                >Студент</button>
                <div className='grid gap-[10px] pt-[10px]'>
                    <input onChange={e => setFullName(e.target.value)} className='outline-none p-[3px]' type="text" placeholder='имя'/>
                    <input onChange={e => setSpeciality(e.target.value)} className={`outline-none p-[3px] ${isStudent ? 'flex' : 'hidden'}`} type="text" placeholder='специальность'/>
                    <input onChange={e => setEmail(e.target.value)}  className='outline-none p-[3px]' type="text" placeholder='почта'/>
                </div>
                <div className='flex justify-end pt-[10px]'>
                    <Button onClick={() => createUser()}>создать</Button>
                </div>
            </div>
        </Modal>
    )
}
