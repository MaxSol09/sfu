import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { notification } from 'antd';

const Context = React.createContext({
  name: 'Default',
});

export const NotificationsLogin = () => {
    const status = useAppSelector(el => el.auth.status);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback((type: 'success' | 'errors' | 'loading') => {
        api.info({
            message: `Уведомление`,
            description: <Context.Consumer>{() => `${type === 'success' ? 'Успешный вход' : type === 'loading' ? 'Загрузка...' : 'Ошибка при входе'}`}</Context.Consumer>,
            placement: 'topRight',
        })
    }, [api])

    useEffect(() => {
        if(status !== 'none') {
            openNotification(status)
        }
    }, [status, openNotification])

    return (
        <>{contextHolder}</>
    )
}

