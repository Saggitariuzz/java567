// CurrentTime.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CurrentTime() {
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const updateCurrentTime = async() =>{
            try{
                const response = await axios.get("http://localhost:8080/time");
                setTime(response.data);
            }
            catch(error){
                setError(error);
            }
        }

        updateCurrentTime(); // Обновление времени при монтировании
        const interval = setInterval(updateCurrentTime, 1000); // Обновление каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    return <div>{time}</div>;
}

export default CurrentTime;
