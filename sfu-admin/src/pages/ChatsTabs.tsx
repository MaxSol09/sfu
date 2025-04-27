import { Layout  } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useLayoutEffect, useRef, useState} from 'react';
import { Content } from 'antd/es/layout/layout';
import { useQuery } from 'react-query';
import { usersService } from '../service/usersService';
import { useUserStore } from '../zustand/auth';
import { ChatsPosts } from '../components/Chats/Chat/Chat';
import { SkeletonChat } from '../components/Chats/ChatTabs/SkeletonChat';
import { SearchChat } from '../components/Chats/ChatTabs/SearchChat';
import { CardHeader } from '@mui/material';
import User from '../images/user.jpg' 

const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
};

export const ChatsTabs = () => {

    const {selectChat} = useUserStore(el => el)

    const {getMessages, getUsers, messagesArr} = useUserStore(el => el)

    const chatsFetch = useQuery({
        queryKey: ['usersKey'],
        queryFn:  usersService.getAllUsers,
        select: data => data.data
    })

    useEffect(() => {
        if(chatsFetch.isSuccess){
            getUsers(chatsFetch.data)
            getMessages(chatsFetch.data)
        }
    }, [chatsFetch.isSuccess])
    
    const [siderWidth, setSiderWidth] = useState(0);

    useLayoutEffect(() => {
        const measureSider = () => {
            if (siderRef.current) {
                setSiderWidth(siderRef.current.offsetWidth);
            }
        };

        measureSider();
        window.addEventListener('resize', measureSider);

        return () => window.removeEventListener('resize', measureSider);
    }, []);

    const {selectChatFn} = useUserStore(el => el)

    const siderRef = useRef<HTMLDivElement>(null);

    return (
        <Layout style={layoutStyle}>
            <Sider ref={siderRef} width='25%' className="bg-gray-100 border-r-[1px] cursor-pointer" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                <SearchChat />
                {chatsFetch.isSuccess ? messagesArr.length ?
                    messagesArr.map(chat => <CardHeader key={chat.userID} onClick={() => selectChatFn(chat.userID, chat.chat)}
                        avatar={
                            <div>
                                <img className='w-[50px] h-[50px] rounded-full object-cover' src={chat.avatar ? chat.avatar : User} alt="avatar" />
                            </div>
                        }
                        title={
                            <div
                                className='text-[20px] whitespace-nowrap overflow-hidden text-ellipsis'
                                style={{maxWidth: window.innerWidth > 1000 ? siderWidth/1.6 : siderWidth/2}}
                            >
                                {chat.fullName}
                            </div>
                        }
                        subheader={
                            <div className='w-full'> 
                                <p className={`whitespace-nowrap overflow-hidden text-ellipsis`}
                                    style={{maxWidth: window.innerWidth > 1000 ? siderWidth/1.6 : siderWidth/2}}>
                                    {chat.chat.length > 0 ? chat.chat[0].text : 'Нет сообщений'}
                                </p>
                            </div>
                        }
                    />) : ''
                    : <div className='grid'>
                        <SkeletonChat />
                        <SkeletonChat />
                        <SkeletonChat />
                        <SkeletonChat />
                        <SkeletonChat />
                        <SkeletonChat />
                    </div>
                }
            </Sider>
            <Content className='py-[20px] overflow-x-auto'>
                {selectChat.id ? <ChatsPosts messages={selectChat.chat} /> : <h1 className='text-[22px] text-center pt-[25%]'>Выберите чат</h1>}
            </Content>
        </Layout>
  )
}
