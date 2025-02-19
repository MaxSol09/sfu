import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { Panel } from '../Panel'
import { Content } from 'antd/es/layout/layout'
import { ChatsTabs } from './ChatTabs/ChatsTabs'

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

export const Chats: React.FC = () => {

    return (
        <Layout style={layoutStyle}>
        <Sider width='18%' className="bg-gray-200">
            <Panel currPage='chats'></Panel>
        </Sider>
        <Content>
          <ChatsTabs></ChatsTabs>
        </Content>
    </Layout>
    )
}
