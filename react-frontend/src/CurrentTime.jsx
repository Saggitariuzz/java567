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

        updateCurrentTime();

        const interval = setInterval(() => {
            updateCurrentTime();
        }, 10000000);

        return () => clearInterval(interval); 
    }, []);

    useEffect(()=>{
        const registerVisitor = async () => {
            try {
                const response = await axios.get("http://localhost:8080/incrementvisitor", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setVisitorCount(response.data);
            } catch (error) {
                console.error("Ошибка при регистрации посетителя", error);
                setVisitorError("Ошибка при регистрации посетителя");
            }
        };
        registerVisitor();
    }, [])

    return (
        <div>
            {error && <div>{error}</div>}
            <div>{time}</div>
            {visitorError && <div>{visitorError}</div>}
            <div>{`Количество посетителей: ${visitorCount}`}</div>
        </div>
    );
}

export default CurrentTime;
