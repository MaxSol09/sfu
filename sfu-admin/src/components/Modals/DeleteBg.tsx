import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { isUser } from '../../utils/checkValue'
import { useUserStore } from '../../zustand/auth'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'

type Props = {
    modal: boolean,
    setModal: any,
    id: any
}

export const DeleteBg: React.FC<Props> = ({modal, setModal, id}) => {

    const user = useUserStore(el => el.user.value)

    const sendBg = useUserStore(el => el.sendBg)

    const mutateBackground = useMutation(usersService.changeBackground, {
        mutationKey: ['changeBgDelete446', id]
    })

    useEffect(() => {
        if(mutateBackground.isSuccess){
            sendBg('')
        }
    }, [mutateBackground.isSuccess])
    

    const deleteBgFun = () => {
        if(!isUser(user)) return
    
        mutateBackground.mutate({ id: user._id, backgroundProfile: '' }); //меняю задний фон у определенного юзера
          
        setModal(false)
    }

    return (
        <Modal open={modal} onOk={() => deleteBgFun()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
            <p className='text-xl pb-3'>Вы уверены, что хотите удалить фон?</p>
        </Modal>
    )
}
