import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'

type Props = { 
    setModal: any,
    modal: boolean, 
    role: 'Абитуриент' | 'Студент' | 'Админ',
    userID: string
}

export const ChangeRole: React.FC<Props> = ({modal, setModal, role, userID}) => {

    const {data, isSuccess, mutate} = useMutation(usersService.changeUserRole, {
        mutationKey: ['changeRole']
    })

    useEffect(() => {
        if(isSuccess){
            console.log(data.data)
        }
    }, [isSuccess])

    return (
        <Modal open={modal} onOk={() => mutate({role, userID})} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
            <p className='text-xl pb-3'>Вы уверены, что хотите изменить роль данного пользователя?</p>
        </Modal>
    )
}
