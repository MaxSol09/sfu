import { TableCell, TableRow, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserData } from '../../types/types'
import { Link } from 'react-router-dom'
import DefaultUser from '../../images/user.jpg'
import { DeleteUser } from '../Modals/DeleteUser'
import { UserBan } from '../Modals/UserBan'
import Delete from '../../images/delete.png'
import Ban from '../../images/ban.png'
import Ban2 from '../../images/ban2.png'
import { Select, Space } from 'antd'
import { ChangeRole } from '../Modals/ChangeRole'

type Props = {
    user: UserData
}

export const User: React.FC<Props> = ({user}) => {

    const [banId, setBanId] = useState<string>('')
    const [modalBan, setModalBan] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')

    const openDeleteModalFn = (id: string) => {
        setDeleteId(id)
        setModalDelete(true)
    }

    const openBanModal = (id: string) => {
        setModalBan(true)
        setBanId(id)
    }

    const [userID, setUserID] = useState<string>('')
    const [role, setRole] = useState<'Админ' | 'Студент' | 'Абитуриент'>(user.role)

    const handleChange = (value: 'Админ' | 'Студент' | 'Абитуриент') => {
        if(value !== userID){
            console.log(userID)
            setRole(value)
            setModal(true)
        }
    };

    useEffect(() => {
        setUserID(user._id)
    }, [user])

    const [modal, setModal] = useState<boolean>(false)

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar src={user.avatarUrl ? user.avatarUrl : DefaultUser} alt="user" />
                </TableCell>
                <TableCell className='break-all cursor-pointer'>
                    <Link to={`/profile/${user._id}`}>{user.fullName}</Link>
                </TableCell>
                <TableCell>
                <Space wrap>
                    <Select
                    defaultValue={user.role}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Абитуриент', label: 'Абитуриент' },
                        { value: 'Студент', label: 'Студент' },
                        { value: 'Админ', label: 'Админ' }
                    ]}
                    />
                </Space>
                </TableCell>
                <TableCell className='break-all'>{user.email}</TableCell>
                <TableCell>{user.speciality ? user.speciality :'отсутствует'}</TableCell>
                <TableCell>{user.ban ? 'да' : 'нет'}</TableCell>
                <TableCell>
                    <div className='flex items-center mr-auto'>
                        <img onClick={() => openBanModal(user._id)} className='w-[20px] h-[20px]' src={user.ban ? Ban2 : Ban} alt="ban" />
                        <img onClick={() => openDeleteModalFn(user._id)} className='h-[20px] ml-[10px]' src={Delete} alt="delete" />
                    </div>
                </TableCell>
            </TableRow>
            <DeleteUser modal={modalDelete} setModal={setModalDelete} deleteId={deleteId} setDeleteId={setDeleteId}/>
            <ChangeRole role={role} userID={userID} modal={modal} setModal={setModal}/>
            <UserBan setModal={setModalBan} modal={modalBan} userID={banId} page={'users'} autherID=''/>
        </>
    )
}
