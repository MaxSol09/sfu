import React, {useEffect} from 'react'
import { Header } from '../components/Header'
import { Panel } from '../components/Panel'
import { Main } from '../components/Main'
import { useAppSelector } from '../redux/hooks.ts'
import { meFetch } from '../redux/auth.ts'
import { useDispatch } from 'react-redux'

export const Home = () => {

  const dispatch = useDispatch()
  const state = useAppSelector(el => el.auth.state)

  console.log(state)

    useEffect(() => {
      dispatch(meFetch())

      const disableBackButton = () => {
          window.history.pushState(null, '', window.location.href)
          window.onpopstate = () => {
          window.history.pushState(null, '', window.location.href)
          }
      }
      
      disableBackButton();
      
      return () => {
          window.onpopstate = null;
      }

    }, [dispatch])

  return (
    <>
      <Header/>
      <Panel/>
      <Main />
    </>
  )
}
