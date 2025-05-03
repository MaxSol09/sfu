import React, { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { notification } from 'antd';


const Context = React.createContext({
  name: 'Default',
});

export const NotificationRegistration = () => {
    const status = useAppSelector(el => el.auth.vkAuth.status);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback((type: 'success' | 'errors' | 'loading') => {
        api.info({
            message: `Уведомление`,
            description: <Context.Consumer>{() => `${type === 'success' ? 'Регистрация пройдена' : type === 'loading' ? 'Загрузка...' : 'Ошибка регистрации'}`}</Context.Consumer>,
            placement: 'topRight',
        })
    }, [api])

    useEffect(() => {
        if(status !== 'none') {
            console.log(status)
            openNotification(status)
        }
    }, [status, openNotification])

    return (
        <>{contextHolder}</>
    )
}
