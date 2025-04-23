import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { msalInstance } from '../..';
import { useAppDispatch } from '../../redux/hooks';
import { registerMicrosoft } from '../../redux/auth';

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

        dispatch(registerMicrosoft({email: email, role: 'Абитуриент', fullName: response.account.name || 'отсутствует'}))
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <div>
      <h1>Microsoft Azure Authentication</h1>
      {userEmail ? (
        <p>Logged in as: {userEmail}</p>
      ) : (
        <button onClick={login}>Login with Microsoft</button>
      )}
    </div>
  );
}