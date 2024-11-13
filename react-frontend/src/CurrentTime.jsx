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
    
    return (
        <div>
            {error && <div>{error}</div>}
            <div>{time}</div>
        </div>
    );
}

export default CurrentTime;
