import React, {useEffect} from 'react'
import { Header } from '../components/Header'
import { Panel } from '../components/Panel'
import { Main } from '../components/Main'
import { useAppSelector } from '../redux/hooks.ts'

export const Home = () => {
  const status = useAppSelector(el => el.auth.status)
  const state = useAppSelector(el => el.auth.state)

  useEffect(() => {

    console.log(status)

    if(status === "success"){
      console.log(state)
    }
  }, [status])

  return (
    <>
      <Header/>
      <Panel/>
      <Main />
    </>
  )
}
