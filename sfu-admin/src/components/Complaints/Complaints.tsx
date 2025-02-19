import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useEffect } from 'react'
import { Content } from 'antd/es/layout/layout';
import { useQuery } from 'react-query';
import { usersService } from '../../service/usersService';
import { ComplaintsPosts } from './ComplaintsPosts';
import { useComplaintsStore } from '../../zustand/complaints';
import { Panel } from '../Panel';

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

export const Complaints: React.FC = () => {

  const getComplaints = useComplaintsStore(el => el.getComplaints)

  const complaints = useComplaintsStore(el => el.complaints.items)
  const status = useComplaintsStore(el => el.complaints.status)

  const complaintsData = useQuery({
      queryKey: ['complaintsGet'],
      queryFn: usersService.getAllComplaints,
      select: data => data.data
  })

  useEffect(() => {
    if(complaintsData.isSuccess){
      getComplaints(status === 'success' ? complaints : complaintsData.data)
    }
  }, [complaintsData.isSuccess])


  return (
    <Layout style={layoutStyle}>
      <Sider width='18%' className="bg-gray-200">
          <Panel currPage='complaints'></Panel>
      </Sider>
      <Content className='py-[20px] overflow-x-auto'>
        <h1 className='text-center text-[22px]'>Жалобы</h1>
        <ComplaintsPosts complaints={complaints} loading={complaintsData.isLoading}/>
      </Content>
    </Layout>
  )
}
