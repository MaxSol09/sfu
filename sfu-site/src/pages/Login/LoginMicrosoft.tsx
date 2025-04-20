import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';

export const LoginMicrosoft: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const account = instance.getActiveAccount();

    useEffect(() => {
        if (isAuthenticated && account) {
            setIsLogged(true);
            setUserName(account.name || 'none name');
            // Получаем email
            getUserEmail(account.idToken || 'none id');
        }
    }, [isAuthenticated, account]);

    const handleLogin = async () => {
        let response = null;

        try {
            response = await instance.loginPopup({
                scopes: ['User.Read'] // включите необходимый scope
            });
        } catch (err) {
            console.log('Error during login >>> ', err);
        }

        if (response?.account) {
            instance.setActiveAccount(response.account);
            setIsLogged(true);
            setUserName(response.account.name || 'none name');
            getUserEmail(response.account.idToken || 'none id');
        } else {
            setIsLogged(false);
            alert('Failed to log in through Microsoft');
        }
    };

    const getUserEmail = async (idToken: string) => {
        const graphEndpoint = "https://graph.microsoft.com/v1.0/me";
        const accessTokenResponse = await instance.acquireTokenSilent({
            scopes: ["User.Read"], // Включите необходимые привилегии
            account: instance.getAllAccounts()[0],
        });

        if (accessTokenResponse) {
            const response = await fetch(graphEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessTokenResponse.accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserEmail(data.mail || 'none@mail.com'); // Установите email 

                console.log('data >>>', data)
            } else {
                console.error('Error fetching user email:', response);
            }
        }
    };

    return (
        <>
            <div>LoginMicrosoft</div>
            {!isLogged && (
                <div>
                    <button onClick={handleLogin}>Entra Id </button>
                </div>
            )}
            {isLogged && (
                <div>
                    <p>User: {userName}</p>
                    <p>Email: {userEmail}</p>
                    <button>Token Info</button>
                </div>
            )}
            {isLogged && (
                <div>
                    <button>Logout</button>
                </div>
            )}
        </>
    );
};