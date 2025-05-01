import React from 'react'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Layout from 'antd/es/layout/layout'

type TypeProps = {
  sider: any,
  content: any
}

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
};

export const LayoutPage: React.FC<TypeProps> = ({sider, content}) => {
  return (
    <Layout style={layoutStyle}>
      <Sider width='18%' className="bg-gray-200">
        {sider}
      </Sider>
      <Content className='pt-[10px]'>
        {content}
      </Content>
    </Layout>
  )
}
