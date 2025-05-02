import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'
import User from '../../images/user.jpg'
import { isUser } from '../../utils/checkValue';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePage } from '../../redux/page';
import { fetchQuestions, fetchTags } from '../../redux/questions';
import { useNavigate } from 'react-router-dom';
import { TypePage } from '../../types/types';

type typeProps = {
    open: boolean, 
    setOpen: any,
    currPage: TypePage
}

export const Menu: React.FC<typeProps> = ({open, setOpen, currPage}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

   const questionLink = useAppSelector(el => el.page.questionOpen.link)

    const state = useAppSelector(el => el.auth.state)
    const [drawerWidth, setDrawerWidth] = useState<string>('25%')

    const handleResize = () => {
      if (window.innerWidth < 440) {
        setDrawerWidth('60%'); // Установите ширину на 75%, если ширина экрана меньше 800px
      }
      else if (window.innerWidth < 550) {
        setDrawerWidth('50%'); // Установите ширину на 75%, если ширина экрана меньше 800px
      }
      else if (window.innerWidth < 700) {
        setDrawerWidth('40%'); // Установите ширину на 75%, если ширина экрана меньше 800px
      }
      else if(window.innerWidth < 800){
        setDrawerWidth('30%')
      } else {
        setDrawerWidth('25%'); // В противном случае 25%
      }
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize()
      return () => {
        window.removeEventListener('resize', handleResize)
      };
    }, []);

      const homeClick = () => {
    
        console.log('render homeclick')

        setOpen(false)
    
        dispatch(fetchQuestions())
        dispatch(fetchTags())
    
        dispatch(changePage({type: 'HOME'}))
    
        if(questionLink){
          navigate('/' + questionLink.slice(22, questionLink.length))
        }
        else{
          navigate('/')
        }
        
      }

       const aboutClick = () => {
        setOpen(false)
      
          console.log('render aboutclick')
      
          if(currPage === 'question'){
            dispatch(changePage({type: 'ABOUT', link: window.location.href}))
          }
          else{
            dispatch(changePage({type: 'ABOUT'}))
          }
      
          navigate('/about')
        }

        const profileClick = () => {
          if(isUser(state)){
            navigate(`/profile/${state._id}`)
          }
        }
      

        return (
          <Drawer
              closable
              destroyOnClose
              placement="right"
              open={open}
              onClose={() => setOpen(false)}
              width={drawerWidth}
              style={{ padding: '0px' }}  
          >
              <div className='flex flex-col h-full'>
                  {isUser(state) ? (
                      <div className='flex items-center gap-[10px] justify-center'>
                          <img src={state.avatarUrl ? state.avatarUrl : User} className='max-[1130px]:w-[70px] max-[1130px]:h-[70px] max-[1000px]:w-[60px]
                           max-[1000px]:h-[60px] w-[45px] h-[45px] rounded-full object-cover max-[950px]:w-[50px] max-[950px]:h-[50px]' alt="avatar" />
                          <div>
                              <p className='text-[25px] whitespace-nowrap overflow-hidden text-ellipsis w-[150px] max-[1100px]:text-[23px] 
                              max-[1000px]:text-[21px] max-[950px]:text-[20px] max-[950px]:w-[130px]'>bwavsbusubvsvbuuvbub</p>
                              <p className='text-[16px] text-gray-700  max-[1100px]:text-[18px] max-[1000px]:text-[17px] max-[950px]:text-[16px]'>{state.role}</p>
                          </div>
                      </div>
                  ) : (
                      <p>Загрузка....</p>
                  )}
                  <div className='grid gap-[25px] mt-[40px] justify-center text-[23px] text-center w-full cursor-pointer'>
                      <p onClick={profileClick} className='w-full'>Профиль</p>
                      <p onClick={homeClick}>Вопросы</p>
                      <p onClick={aboutClick}>Об институте</p>
                      <p>Поддержка</p>
              </div>
              <p className='text-[23px] text-center mt-auto'>Выйти</p>
              </div>
          </Drawer>
    )
}
