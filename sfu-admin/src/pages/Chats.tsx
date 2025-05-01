import React from 'react'
import { LayoutPage } from '../components/Layout'
import { Panel } from '../components/Panel'
import { ChatsTabs } from '../components/Chats/ChatTabs/ChatsTabs'

export const Chats: React.FC = () => {

    return (
      <LayoutPage sider={<Panel currPage='chats'/>} content={<ChatsTabs />}/>
    )
}
