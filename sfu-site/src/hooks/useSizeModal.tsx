import { useEffect, useState } from "react";

export const useModalSize = () => {

    const [modalWidth, setModalWidth] = useState<number | string>(440); // Начальная ширина
    
        // Функция для изменения ширины
    const changeWidth = (newWidth: number | string) => {
        setModalWidth(newWidth);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                changeWidth('85%'); // Установите ширину на 90% при ширине экрана < 500px
            } else {
                changeWidth(440); // Установите ширину обратно на 440px
            }
        };

        window.addEventListener('resize', handleResize); // Добавляем обработчик события

        // Вызываем функцию при первом рендере
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize); // Убираем обработчик при размонтировании
        };
    }, []);
    
    return {modalWidth}
}