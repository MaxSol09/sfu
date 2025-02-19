import React, { useEffect } from 'react'
import { isUser } from '../../utils/checkValue'
import { useMutation } from 'react-query'
import { usersService } from '../../service/usersService'
import { Modal } from 'antd'
import { useUserStore } from '../../zustand/auth'

type Props = { 
    setModal: any,
    modal: boolean
}

export const DeleteAvatar: React.FC<Props> = ({setModal, modal}) => {

    const user = useUserStore(el => el.user.value)

    const sendAvatar = useUserStore(el => el.sendAvatar)

      const mutateAvatar = useMutation(usersService.changeAvatar, {
        mutationKey: ['deleteAvatarModal']
      })
    
      useEffect(() => {
        if(mutateAvatar.isSuccess){
          console.log('qwqgwv')
          sendAvatar('')
        }
      }, [mutateAvatar.isSuccess])

    const deleteAvatar = () => {
        if(isUser(user)){
            mutateAvatar.mutate({id: user._id, avatar: ''})
            setModal(false)
        }
    }

  return (
    <Modal open={modal} onOk={() => deleteAvatar()} cancelText={'Нет'} okText={"Да"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
        <p className='text-xl pb-3'>Вы уверены, что хотите удалить аватарку?</p>
    </Modal>
  )
}
