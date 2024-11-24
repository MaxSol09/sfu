import React from 'react'
import { Questions } from './Questions'
import { Chat } from './Chat'
import { useAppSelector } from '../redux/hooks.ts'
import { Themes } from './Themes.jsx'
import { About } from './About.jsx'
import { CreateQuestion } from './CreateQuestion.tsx'
import { Question } from './Question.jsx'

export const Main = () => {

  return (
    <main className='z-0 pt-[130px] ml-[25%] mr-[50px]'>
        <Questions />
        <Themes />
        <About />
        <CreateQuestion />
        <Question />
        <Chat />
    </main>
  )
}
