import React from 'react'
import { ComplaintsPosts } from '../components/Complaints/ComplaintsPosts';
import { Panel } from '../components/Panel';
import { LayoutPage } from '../components/Layout';
import { useGetComplaints } from '../hooks/hooks';

export const Complaints: React.FC = () => {

  const {complaints, isLoading} = useGetComplaints()

  return (
    <LayoutPage sider={<Panel currPage='complaints'/>} content={<>
      <h1 className='text-center text-[22px]'>Жалобы</h1>
      <ComplaintsPosts complaints={complaints} loading={isLoading}/>
    </>}/>
  )
}
