// CurrentTime.js
import React, { useEffect, useState } from 'react';

function CurrentTime() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString();
            setTime(formattedTime);
        };

        updateCurrentTime(); // Обновление времени при монтировании
        const interval = setInterval(updateCurrentTime, 1000); // Обновление каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    return <div>Время в Арзамасе : {time}</div>;
}

export default CurrentTime;
