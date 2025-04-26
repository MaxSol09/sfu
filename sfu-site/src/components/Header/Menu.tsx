import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'
import User from '../../images/user.jpg'
import { isUser } from '../../utils/checkValue';
import { useAppSelector } from '../../redux/hooks';

type typeProps = {
    open: boolean, 
    setOpen: any
}

export const Menu: React.FC<typeProps> = ({open, setOpen}) => {

    const state = useAppSelector(el => el.auth.state)
    const [drawerWidth, setDrawerWidth] = useState<string>('25%')

    const handleResize = () => {
      if (window.innerWidth < 800) {
        setDrawerWidth('30%'); // Установите ширину на 75%, если ширина экрана меньше 800px
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

    return (
        <Drawer
            closable
            destroyOnClose
            title={<p>Боковое меню</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
            width={drawerWidth}
        >
            {isUser(state) ? <div className='flex items-center gap-[10px] justify-center'>
                <img src={state.avatarUrl ? state.avatarUrl : User} className='w-[30%] rounded-full' alt="avatar" />
                <div>
                    <p className='text-[25px] break-words text-ellipsis max-[1100px]:text-[20px] leading-[20px]'>{state.fullName}</p>
                    <p className='text-[16px] text-gray-700  max-[1100px]:text-[15px]'>{state.role}</p>
                </div>
            </div> : <p>Загрузка....</p>}
        </Drawer>
    )
    }
