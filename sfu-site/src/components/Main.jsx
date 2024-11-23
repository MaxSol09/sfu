import React from 'react'
import { Questions } from './Questions'
import { Chat } from './Chat'
import { useAppSelector } from '../redux/hooks.ts'
import { Themes } from './Themes.jsx'
import { About } from './About.jsx'

export const Main = () => {

  return (
    <main className='z-0 pt-[140px] ml-[35%] mr-[100px]'>
        <Questions />
        <Themes />
        <About />
        <Chat />
    </main>
  )
}
