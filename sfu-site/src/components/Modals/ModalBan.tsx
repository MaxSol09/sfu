import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { createComplaint } from '../../redux/auth'
import { isUser } from '../../utils/checkValue'

type Props = {
    modal: boolean,
    setModal: any
}

export const ModalBan: React.FC<Props> = ({setModal, modal}) => {

  const [text, setText] = useState<string>('')

  const user = useAppSelector(el => el.auth.user.value)
  const state = useAppSelector(el => el.auth.state)

  const dispatch = useAppDispatch()

  const statusBanSubmit = useAppSelector(el => el.auth.complaintStatus)

  const banSubmit = () => {
    if(text.length && isUser(user) && isUser(state) && statusBanSubmit !== 'loading'){
      dispatch(createComplaint({userID: user._id, autherID: state._id, text: text}))
    }
  }
  
  useEffect(() => {
    if(statusBanSubmit === 'success'){
      setModal(false)
      setText('')
    }
  }, [statusBanSubmit, setModal])

  return (
    <Modal open={modal} onCancel={() => setModal(false)} onOk={() => banSubmit()} okText='отправить' cancelText='отмена'>
        <textarea value={text} onChange={e => setText(e.target.value)} className='outline-none p-[5px] text-[19px] w-[95%] border-[2px] h-[200px] min-h-[200px] max-h-[200px]' placeholder='напишите причину жалобы'/>
    </Modal>
  )
}
