import { Button } from 'antd'
import AddUser from '../images/adduser.png'
import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { UserCreate } from '../components/Modals/UserCreate'
import { Panel } from '../components/Panel'
import { FindUser } from '../components/Users/FindUser'
import { FilterUsers } from '../components/Users/FilterUsers'
import { User } from '../components/Users/User'
import { useGetUsers } from '../hooks/hooks'
import { LayoutPage } from '../components/Layout'


export const Users: React.FC = () => {

    const [modal, setModal] = useState<boolean>(false)

    const {students, applicants, users, usersArr} = useGetUsers()

  return (
    <>
     <LayoutPage sider={<Panel currPage='users'/>} content={
        <div className='h-[100vh] pb-[100px] overflow-auto'>
            <header className='flex'>
                <div className='border-r-[2px] border-black w-1/3 py-[10px] grid justify-center items-center text-center'>
                    <p className='text-[120px] font-medium leading-none'>{usersArr.length}</p>
                    <p className='text-[20px] text-gray-500'>пользователей</p>
                </div>
                <div className='border-r-[2px] border-black py-[10px] w-1/3 grid justify-center items-center text-center'>
                    <p className='text-[120px] font-medium leading-none'>{applicants.length}</p>
                    <p className='text-[20px] text-gray-500 leading-none'>абитуриентов</p>
                </div>
                <div className=' px-[50px] w-1/3 grid justify-center py-[10px] items-center text-center'>
                    <p className='text-[120px] font-medium leading-none'>{students.length}</p>
                    <p className='text-[20px] text-gray-500 leading-none'>студентов</p>
                </div>
            </header>
            <main className='px-[100px] pt-[30px]'>
                <div className='flex justify-end gap-[30px]'>
                    <Button onClick={() => setModal(true)} className='text-[20px] pb-[3px]'>
                        <img src={AddUser} alt="adduser" className='w-[20px] pt-[3px]' />
                        добавить
                    </Button>
                    <FindUser />
                </div>
                <FilterUsers />
                <div className='pt-[20px]'>
                    <TableContainer className='h-[500px] overflow-auto' component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Avatar</TableCell>
                                    <TableCell>FullName</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Speciality</TableCell>
                                    <TableCell>Ban</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {users.map((user) => (
                                    <User key={user._id} user={user}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <UserCreate modal={modal} setModal={setModal}/>
            </main>
        </div>} />
    </>
  )
}
