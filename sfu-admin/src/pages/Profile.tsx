import React from 'react'
import { Panel } from '../components/Panel';
import { UserProfile } from '../components/Profile/UserProfile';
import { LayoutPage } from '../components/Layout';

export const Profile: React.FC = () => {
  return (
    <>
      <LayoutPage sider={<Panel currPage='users'/>} content={<UserProfile />}/>
    </>
  )
}
