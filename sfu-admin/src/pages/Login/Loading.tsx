import React from 'react'
import { isUser } from '../../utils/checkValue'
import { Router } from '../../Router'
import Warn from '../../images/warn.png'
import { useGetMe } from '../../hooks/hooks'
import { Login } from './Login'
import { Link } from 'react-router-dom'

export const Loading: React.FC = () => {

    const url = document.location.href

    return (
        <>
            <Router />
        </>
    )
}
