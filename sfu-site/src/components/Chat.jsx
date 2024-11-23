import Support from '../images/support.png'
import Send from '../images/send.png'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { changeSupport } from '../redux/page.ts'

export const Chat = () => {

    const support = useAppSelector(el => el.page.support)
    const dispatch = useAppDispatch()
    const messageRef = useRef(null)

    const [text, setText] = useState('')

    useEffect(() => {
        if(support) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight //делаем так чтобы при открытии пересписки мы изначально были в последнх сообщениях
        }
    }) 
    
            
    return (
        <>
            <div title="Поддержка" onClick={() => dispatch(changeSupport({type: support}))} className='bg-white flex items-center justify-center w-[80px] h-[80px] shadow-custom-rounded rounded-[50%] fixed right-8 bottom-8'>
                <img className='w-[50px] h-[50px]' src={Support} alt="support" />
            </div>
            <div style={{display: support ? 'flex' : 'none'}} className='w-[320px] flex-col h-[410px] border-gray-600 shadow-custom-rounded bg-white fixed right-6 bottom-6'>
                <div className='py-2 bg-gray-100 flex px-3 justify-between text-[19px]'>
                    <h1 className='text-center'>Поддержка</h1>
                    <p onClick={() => dispatch(changeSupport({type: support}))} className='cursor-pointer'>&#10006;</p>
                </div>
                <div ref={messageRef} className='py-3 relative overflow-auto scrollbar-thin'>
                </div>
                <div className='flex justify-between w-full px-4 py-1 gap-3 pb-1 absolute bottom-[5px]'>
                    <textarea value={text} onChange={e => setText(e.target.value)} className='items-center overflow-auto overflow-x-hidden overflow-y-hidden w-full pb-1 outline-none resize-none' placeholder='Cообщение:' type="text" />
                    <div className='flex w-[58px] justify-center items-center px-2 mb-1 rounded-[50%] bg-slate-200 shadow-custom-rounded hover:bg-blue-400 duration-200'>
                        <img src={Send} alt='Send'></img>
                    </div>
                </div>
            </div>
        </>
  )
}