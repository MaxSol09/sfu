import React, {useState} from 'react'
import { Complaint } from '../../types/types'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { UserBan } from '../Modals/UserBan'
import { isUser } from '../../utils/checkValue'
import { useDeleteComplaint } from '../../hooks/hooks'

type Props = {
    complaints: Complaint[],
    loading: boolean
}

export const ComplaintsPosts: React.FC<Props> = ({complaints, loading}) => {

  const [modal, setModal] = useState<boolean>(false)
  const [idUser, setIdUser] = useState<string>('')
  const [autherId, setAutherId] = useState<string>('')

  const {deleteComplaint} = useDeleteComplaint(idUser, autherId)

  const banUser = (userID: string, autherID: string) => {
    setIdUser(userID)
    setAutherId(autherID)
    setModal(true)
  }

  const filterComplaints:Complaint[] = complaints.filter(el => isUser(el.auther) && isUser(el.user))

  return (
    <div className='py-[20px] grid place-items-center gap-[15px]'>
        {loading ? <Spin size='small'></Spin> : filterComplaints.length ? filterComplaints.map(el => isUser(el.auther) && isUser(el.user) && (
            <div key={el.date} className='bg-gray-200 py-[10px] px-[15px] rounded-md border-[1px] border-gray-300 w-[70%]'>
                <p className='text-[18px]'>Жалоба на пользователя <Link className='text-blue-400 pr-[3px] hover:text-blue-500' to={`/profile/${el.user._id}`}>{el.user.fullName}</Link> 
                  от пользователя <Link className='text-blue-400 hover:text-blue-500' to={`/profile/${el.auther._id}`}>{el.auther.fullName}</Link>
                </p>
                <p className='text-[18px]'>Текст: <span className='pl-[3px]'>{el.text}</span></p>
                <div className='flex justify-end gap-[20px]'>
                  <button onClick={() => deleteComplaint(el.user._id, el.auther._id)} className='py-[3px] px-[10px] bg-red-400 text-white'>Удалить</button>
                  <button onClick={() => banUser(el.user._id, el.auther._id)} className='py-[3px] px-[10px] bg-green-400 text-white'>Забанить</button>
                </div>
            </div>
        )) : <p className='text-center'>нет жалоб</p>}
        <UserBan modal={modal} setModal={setModal} userID={idUser} page={'ban'} autherID={autherId}/>
    </div>
  )
}
