import React, { useState } from 'react';
import { msalInstance } from '../..';
import { useAppDispatch } from '../../redux/hooks';
import { loginMicrosoft, registerMicrosoft } from '../../redux/auth';

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