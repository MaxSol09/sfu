import React, { useState } from 'react';
import { msalInstance } from '../..';
import { useAppDispatch } from '../../redux/hooks';
import { loginMicrosoft } from '../../redux/auth';
import LogoMicrosoft from '../../images/microsoftlogo.png'

export const LoginMicrosoft: React.FC = () => {

  const dispatch = useAppDispatch()

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = () => {
    const loginRequest = {
      scopes: ["User.Read"]
    };

    msalInstance.loginPopup(loginRequest)
      .then(response => {
        const email = response.account.username;
        console.log(response.account)
        setUserEmail(email); // Сохраните Email пользователя+
        console.log("User email: ", email);

        dispatch(loginMicrosoft({email: email}))
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <button 
        onClick={login} 
        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 w-[70%] max-[470px]:w-[80%]"
      >
        <div className='text-[17px] font-normal flex gap-[10px] items-center'>
          <img src={LogoMicrosoft} alt="microosftLogo" className='h-[20px]'/>
          Вход для студентов
        </div>
    </button>
  );
}