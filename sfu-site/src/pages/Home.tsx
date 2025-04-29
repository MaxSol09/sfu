import React, {useEffect} from 'react'
import { Header } from '../components/Header/Header'
import { Panel } from '../components/Panels/Panel'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CreateQuestion } from '../components/Modals/CreateQuestion'
import { Questions } from './Questions/Questions'
import { NotificationQuestion } from '../components/Notifications/NotificationQuestion'

const MemoHeader = React.memo(Header)

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

  return (
    <>
      <MemoHeader currPage={'home'}/>
      <Panel />
      <main className='z-0 pt-[130px] max-[940px]:pt-[110px] max-[520px]:px-[20px] max-[1130px]:ml-0 max-[1130px]:pl-[105px] max-[940px]:px-[50px] max-[720px]:px-[20px] ml-[25%] pl-[50px] pr-[105px]'>
        {form ? <CreateQuestion /> : <Questions />}
      </main>
      <NotificationQuestion />
    </>
  )
}
