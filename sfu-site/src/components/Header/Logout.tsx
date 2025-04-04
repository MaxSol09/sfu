import { Box, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/auth';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '10px',
    outline: 'none',
    boxShadow: 24,
    padding: '15px 25px'
};

type Props = {
    modal: boolean,
    setModal: any
}

export const Logout: React.FC<Props> = ({modal, setModal}) => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutFun = () => {
        dispatch(logout())
        setModal(false)
        localStorage.removeItem('JWTtoken')
        navigate('/login')
        window.location.reload()
    }

    return (
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h1 className='text-[20px]'>
                Вы уверены, что хотите выйти?
                </h1>
                <div className='flex gap-[15px] justify-end pt-[20px]'>
                <button onClick={() => setModal(false)} className='border-[1px] rounded-[5px] border-gray-400 py-[5px] px-[15px] text-[17px] hover:border-blue-500 hover:text-blue-500'>нет</button>
                <button onClick={() => logoutFun()} className='rounded-[5px] bg-blue-500 py-[5px] px-[20px] text-white text-[17px] hover:bg-blue-400'>да</button>
                </div>
            </Box>
        </Modal>
    )
}
