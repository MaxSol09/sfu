import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { msalInstance } from '../..';
import { registerMicrosoft } from '../../redux/auth';
import LogoMicrosoft from '../../images/microsoftlogo.png'

export const RegistrationMicrosoft:React.FC = () => {

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

        dispatch(registerMicrosoft({email: email, role: 'Абитуриент', fullName: response.account.name || 'отсутствует'}))
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <button 
        onClick={login} 
        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        <div className='text-[17px] font-normal flex gap-[10px] items-center'>
          <img src={LogoMicrosoft} alt="microosftLogo" className='h-[20px]'/>
          Вход для студентов
        </div>
    </button>
  );
}