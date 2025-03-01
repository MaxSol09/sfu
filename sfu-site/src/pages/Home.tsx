import React, {useEffect} from 'react'
import { Header } from '../components/Header/Header'
import { Panel } from '../components/Panels/Panel'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CreateQuestion } from '../components/Modals/CreateQuestion'
import { Questions } from '../components/Tabs/Questions/Questions'
import { NotificationQuestion } from '../components/Notifications/NotificationQuestion'

export const Home: React.FC = () => {

    const dispatch = useAppDispatch();
    const form = useAppSelector(el => el.page.form);

    useEffect(() => {
        // логика за счёт которой после входа или регистрации нельзя было нажать в браузере стрелочку, чтобы перейти обратно 
        const disableBackButton = () => {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => {
                window.history.pushState(null, '', window.location.href)
            }
        }

        disableBackButton()

        return () => {
            window.onpopstate = null
        }
    }, [dispatch])


    console.log(form)


  return (
    <>
      <Header currPage={'home'}/>
      <Panel />
      <main className='z-0 pt-[130px] ml-[25%] mr-[50px]'>
        {form ? <CreateQuestion /> : <Questions />}
      </main>
      <NotificationQuestion />
    </>
  )
}
