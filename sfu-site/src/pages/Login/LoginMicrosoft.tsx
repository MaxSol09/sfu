import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'

export const LoginMicrosoft: React.FC = () => {

    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('')

    const {instance} = useMsal()
    const isAuthenticated = useIsAuthenticated()
    const account = instance.getActiveAccount()

    useEffect(() => {
        if(isAuthenticated && account){
            setIsLogged(true)
            setUserName(account.name || 'none name')
        }
    }, [])

    const handleLogin = async () => {
        let response = null;
    
        try {
            response = await instance.loginPopup({
                scopes: ['User.Read']
            });
        } catch (err) {
            console.log('Error during login >>> ', err);
        }
    
        if (response?.account) {
            console.log(response.account);
            instance.setActiveAccount(response.account);
            setIsLogged(true);
            setUserName(response.account.name || 'none name');
        } else {
            setIsLogged(false);
            alert('Failed to log in through Microsoft');
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
                    <button>Token Info</button>
                </div>
            )}
            {isLogged && (
                <div>
                    <button>Logout</button>
                </div>
            )}  
        </>
    )
}
