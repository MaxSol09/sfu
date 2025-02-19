import React, { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { notification } from 'antd'

const Context = React.createContext({
  name: 'Default',
});

export const NotificationQuestion: React.FC = () => {

    const statusCreate = useAppSelector(el => el.questions.questionChanges.status);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(() => {
        api.info({
            message: `Уведомление`,
            description: <Context.Consumer>{() => `Вопрос отправлен на модерацию!`}</Context.Consumer>,
            placement: 'topRight',
        })
    }, [api])

    useEffect(() => {
        if (statusCreate === 'success') {
            openNotification()
        }
    }, [statusCreate, openNotification])

    return (
        <>{contextHolder}</>
    )
}
