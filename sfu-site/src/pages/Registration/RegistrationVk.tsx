import React, { useEffect } from 'react'
import { getVkUser } from '../../redux/auth';
import { useAppDispatch } from '../../redux/hooks';

export const RegistrationVk = () => {

    const dispatch = useAppDispatch()

    const appId = '53108749'; // Замените на ваш client_id
    const redirectUri = 'https://sfu-86v5.vercel.app/register'; // Замените на URL вашего приложения
    
    useEffect(() => {
        // Получение параметров из URL hash (после редиректа)
        const hash = window.location.hash.substring(1); // Убираем '#'
        const params = new URLSearchParams(hash);
    
        console.log(params.get('email'))
    
        const accessToken = params.get('access_token');
        const userId = params.get('user_id');
        const email = params.get('email')
    
        if (accessToken && userId) {
        // Сохраняем токен (например, в localStorage)
        localStorage.setItem('vk_userId', userId);
    
        // Получаем данные пользователя
        getUserData(accessToken, userId, email);
    
        // Очищаем hash из URL (чтобы не было видно в истории браузера)
        window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
    
    // Функция для получения данных пользователя (с использованием VK API)
    const getUserData = async (accessToken: string, userId: string, email: string | null) => {
        try {
        dispatch(getVkUser({token: accessToken, vkID: userId, email: email}))
        console.log('handle log data >>> ', accessToken) 
        } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        }
    };
    
    const handleLogin = () => {
        const scope = 'email,offline'; // Укажите необходимые разрешения
        window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&v=5.199`;
    };


  return (
    <button onClick={() => handleLogin()} id="VKIDSDKAuthButton" className="VkIdWebSdk__button VkIdWebSdk__button_reset max-[470px]:w-[80%]">
        <div className="VkIdWebSdk__button_container">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54648 4.54648C3 6.09295 3 8.58197 3 13.56V14.44C3 19.418 3 21.907 4.54648 23.4535C6.09295 25 8.58197 25 13.56 25H14.44C19.418 25 21.907 25 23.4535 23.4535C25 21.907 25
                19.418 25 14.44V13.56C25 8.58197 25 6.09295 23.4535 4.54648C21.907 3 19.418 3 14.44 3H13.56C8.58197 3 6.09295 3 4.54648 4.54648ZM6.79999 10.15C6.91798 15.8728 9.92951 19.31 14.8932 19.31H15.1812V16.05C16.989 16.2332 18.3371
                17.5682 18.8875 19.31H21.4939C20.7869 16.7044 18.9535 15.2604 17.8141 14.71C18.9526 14.0293 20.5641 12.3893 20.9436 10.15H18.5722C18.0747 11.971 16.5945 13.6233 15.1803 13.78V10.15H12.7711V16.5C11.305 16.1337 9.39237 14.3538 9.314 10.15H6.79999Z" fill="white"/>
            </svg>
            Войти с VK ID
        </div>
    </button>
  )
}
