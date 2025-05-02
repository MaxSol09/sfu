import React, { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { notification } from 'antd';


const Context = React.createContext({
  name: 'Default',
});

export const NotificationRegistration = () => {
    const status = useAppSelector(el => el.auth.status);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(() => {
        api.info({
            message: `Уведомление`,
            description: <Context.Consumer>{() => `Ресгитрация пройдена`}</Context.Consumer>,
            placement: 'topRight',
        })
    }, [api])

    useEffect(() => {
        if (status === 'success') {
            openNotification()
        }
    }, [status, openNotification])

    return (
        <>{contextHolder}</>
    )
}
