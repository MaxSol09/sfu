import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react'
import { Panel } from '../components/Panel';
import { Content } from 'antd/es/layout/layout';
import { Profile } from '../components/Profile/Profile';

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

export const UserProfile: React.FC = () => {
  return (
    <>
      <Layout style={layoutStyle}>
          <Sider width='18%' className="bg-gray-200">
              <Panel currPage='questions'></Panel>
          </Sider>
          <Content>
            <Profile />
          </Content>
      </Layout>
  </>
  )
}
