import React, { useCallback, useEffect } from 'react'
import { notification } from 'antd'
import { useAppSelector } from '../../redux/hooks';

const Context = React.createContext({
  name: 'Default',
});

export const NotificationComplaint:React.FC = () => {

    const [api, contextHolder] = notification.useNotification();
    const statusBanSubmit = useAppSelector(el => el.auth.complaintStatus)

    const openNotification = useCallback(() => {
        api.info({
            message: `Уведомление`,
            description: <Context.Consumer>{() => `Жалоба успешно отправлена!`}</Context.Consumer>,
            placement: 'topRight',
        })
    }, [api])

    useEffect(() => {
        if(statusBanSubmit === 'success'){
            openNotification()
        }
    }, [statusBanSubmit, openNotification])

    return (
        <>
            {contextHolder}
        </>
    )
}
