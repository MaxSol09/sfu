import Support from '../../images/support.png'
import React, { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeSupport } from '../../redux/page'
import { isUser } from '../../utils/checkValue'
import { Messages } from '../Chat/Messeges/Messages'
import { SendMessage } from './SendMessage'

export const Chat: React.FC = () => {

    const support = useAppSelector((el) => el.page.support);
    const dispatch = useAppDispatch();
    const { state } = useAppSelector((el) => el.auth);

    const isInitialRender = useRef(true)

    const changeLastChat = useCallback(() => {
        if (isUser(state)) {
            dispatch({type: 'lastChat', payload: {chat: state.chat, userID: state._id}})
        }
    }, [dispatch, state])

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            changeLastChat()
        }
    }, [changeLastChat])

    const unreadMessages = isUser(state) ? state.chat.filter(el => el.status === 'admin').length - state.lastChat.length : 0

    return (
        <>
            {isUser(state) && <>
                <div
                    style={{ display: support === false ? 'flex' : 'none' }}
                    title="Поддержка"
                    onClick={() => dispatch(changeSupport({ type: support }))}
                    className="bg-white flex items-center justify-center w-[70px] h-[70px] z-[1000] shadow-custom-rounded rounded-[50%] fixed right-5 bottom-5"
                >
                    <img className="w-[40px] h-[40px]" src={Support} alt="support" />
                    <div style={{display: unreadMessages > 0 && isUser(state)  ? 'flex' : 'none'}} 
                        className='w-[23px] h-[23px] rounded-full bg-red-500 absolute top-[0px] right-[-3px] justify-center items-center text-white'>
                        {unreadMessages}
                    </div>
                </div>
                <div
                    style={{ display: support ? 'flex' : 'none' }}
                    className="w-[320px] flex-col h-[410px] max-[1200px]:h-[350px] max-[1200px]:w-[274px] border-gray-600 shadow-custom-rounded bg-white fixed z-[1000] right-6 bottom-6"
                >
                <div className="py-2 bg-gray-100 flex px-3 justify-between text-[19px]">
                    <h1 className="text-center">Поддержка</h1>
                    <p onClick={() => dispatch(changeSupport({ type: support }))} className="cursor-pointer">
                        &#10006;
                    </p>
                </div>
                <Messages />
                <SendMessage />
            </div>
            </>
        }   
    </>
    );
};
