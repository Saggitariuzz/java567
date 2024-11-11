import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CurrentTime() {
    const [time, setTime] = useState(null);
    const [visitorCount, setVisitorCount] = useState(0);  // Начальное значение - 0
    const [error, setError] = useState('');
    const [visitorError, setVisitorError] = useState('');

    useEffect(() => {
        // Функция для обновления времени
        const updateCurrentTime = async () => {
            try {
                const response = await axios.get("http://localhost:8080/time");
                setTime(response.data);
            } catch (error) {
                setError("Ошибка при загрузке времени");
            }
        };


        // Функция для регистрации нового посетителя
        const registerVisitor = async () => {
            try {
                const response = await axios.get("http://localhost:8080/incrementvisitor");
                setVisitorCount(response.data);
            } catch (error) {
                console.error("Ошибка при регистрации посетителя");
                setVisitorError("Ошибка при регистрации посетителя");
            }
        };

        // Вызов функций при монтировании компонента
        registerVisitor(); // Register visitor only once
        updateCurrentTime();

        // Установка интервала для обновления времени
        const interval = setInterval(() => {
            updateCurrentTime();
        }, 10000000); // Обновляем каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    return (
        <div>
            {error && <div>{error}</div>}
            <div>{time}</div>
            <br />
            {visitorError && <div>{visitorError}</div>}
            <div>{`Количество посетителей: ${visitorCount}`}</div>
        </div>
    );
}

export default CurrentTime;
