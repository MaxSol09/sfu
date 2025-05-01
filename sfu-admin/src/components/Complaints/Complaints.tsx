import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { usersService } from '../../service/usersService';
import { ComplaintsPosts } from './ComplaintsPosts';
import { useComplaintsStore } from '../../zustand/complaints';
import { Panel } from '../Panel';
import { LayoutPage } from '../Layout';
import { useGetComplaints } from '../../hooks/hooks';

export const Complaints: React.FC = () => {

  const {complaints, isLoading} = useGetComplaints()

  return (
    <LayoutPage sider={<Panel currPage='complaints'/>} content={<>
      <h1 className='text-center text-[22px]'>Жалобы</h1>
      <ComplaintsPosts complaints={complaints} loading={isLoading}/>
    </>}/>
  )
}
