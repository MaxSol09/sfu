import React from 'react'
import Land from '../images/land.png'
import Eyes from '../images/eyes.svg'
import Comment from '../images/comment.svg'
import {Button} from 'antd'

import { useAppSelector } from '../redux/hooks.ts'
import { Posts } from './Posts.jsx'

export const Themes = () => {
    const {page} = useAppSelector(el => el.page)

    console.log(page)

    return (
        <div style={{display: page === 'themes' ? 'grid' : 'none'}}>
            <div className='flex justify-between items-center px-[55px]'>
                <div className='w-[500px] space-y-[3px]'>
                <h1 className='text-[20px] leading-6'>Обсуждение</h1>
                </div>
                <Button className='ml-[10px] text-[17px]'>Создать тему</Button>
            </div>
            <div className='flex items-center px-[55px] justify-between pt-[20px]'>
                <h1 className='text-[18px]'>Всего тем: 100</h1>
                <div className='flex gap-[20px]'>
                    <h1 className='text-[20px]'>Категории:</h1>
                    <Button>Популярные</Button>
                    <Button>Новые</Button>
                    <Button>Старые</Button>
                    <Button>Все</Button>
                </div>
            </div>
            <Posts />
        </div>
    )
}
