import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CurrentTime() {
    const [time, setTime] = useState(null);
    const [visitorCount, setVisitorCount] = useState(null); // Состояние для количества посетителей
    const [error, setError] = useState('');

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

        // Функция для обновления количества посетителей
        const updateVisitorCount = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getvisitorcount");
                setVisitorCount(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке количества посетителей");
            }
        };

        // Функция для регистрации нового посетителя
        const registerVisitor = async () => {
            try {
                await axios.get("http://localhost:8080/incrementvisitor");
                updateVisitorCount(); // Обновляем количество посетителей сразу после регистрации нового посетителя
            } catch (error) {
                console.error("Ошибка при регистрации посетителя");
            }
        };

        // Вызов функций при монтировании компонента
        updateCurrentTime();
        registerVisitor(); // Регистрация нового посетителя

        // Установка интервала для обновления времени и количества посетителей
        const interval = setInterval(() => {
            updateCurrentTime();
            updateVisitorCount();
        }, 1000); // Обновляем каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    return (
        <div>
            {error ? error : time}
            <br />
            {visitorCount !== null ? `Количество посетителей: ${visitorCount}` : "Загрузка количества посетителей..."}
        </div>
    );
}

export default CurrentTime;
