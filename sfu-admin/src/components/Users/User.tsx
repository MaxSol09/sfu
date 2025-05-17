import { TableCell, TableRow, Avatar } from '@mui/material'
import React, { useState } from 'react'
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
import { useChangeUser } from '../../hooks/hooks'
import Edit from '../../images/edit.svg'
import { AddSpeciality } from '../Modals/AddSpeciality'

type Props = {
    user: UserData
}

export const User: React.FC<Props> = ({user}) => {

    const [modal, setModal] = useState<boolean>(false)

    const {handleChange, role, modalBan, modalDelete, modalRole, openBan,
            openDelete, banId, deleteId, setDeleteId, userID, setModalBan, setModalDelete, setModalRole} = useChangeUser(user)

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
                <TableCell>{user.speciality ? <span className='flex flex-wrap gap-[5px] items-center'>
                    {user.speciality.length ? user.speciality.map((s, index) => (
                        <p>{s}{user.speciality[index + 1] ? ',' : ''}</p>
                    )) : 'отсутствует'}
                    <button className='bg-white shadow-xl p-[3px] flex justify-center items-center w-[23px] h-[23px]'>
                        <img onClick={() => setModal(true)} className='w-[17px]' src={Edit}></img>
                    </button>
                </span> :'отсутствует'}</TableCell>
                <TableCell>{user.ban ? 'да' : 'нет'}</TableCell>
                <TableCell>
                    <div className='flex items-center mr-auto'>
                        <img onClick={() => openBan(user._id)} className='w-[20px] h-[20px]' src={user.ban ? Ban2 : Ban} alt="ban" />
                        <img onClick={() => openDelete(user._id)} className='h-[20px] ml-[10px]' src={Delete} alt="delete" />
                    </div>
                </TableCell>
            </TableRow>
            <DeleteUser modal={modalDelete} setModal={setModalDelete} deleteId={deleteId} setDeleteId={setDeleteId}/>
            <ChangeRole role={role} userID={userID} modal={modalRole} setModal={setModalRole}/>
            <UserBan setModal={setModalBan} modal={modalBan} userID={banId} page={'users'} autherID=''/>
            <AddSpeciality modal={modal}  setModal={setModal} user={user}/>
        </>
    )
}
