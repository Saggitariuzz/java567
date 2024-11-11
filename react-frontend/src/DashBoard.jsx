// WelcomeDashboard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeDashboard() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/dashboard');
                console.log(response.data); // Это поможет проверить данные в консоли
                setUsername(response.data.username);  // Устанавливаем username
                setEmail(response.data.email);        // Устанавливаем email
            } catch (error) {
                setError('Не удалось загрузить информацию о пользователе');
                console.error(error);
            }
        };

    }, []);  // Пустой массив зависимостей, чтобы запрос выполнялся только при монтировании компонента

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: '400px' }}>
                <h2 className="mb-4 text-center">Добро пожаловать!</h2>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <>
                        <p className="mb-4 text-center">Имя пользователя: {username}</p>
                        <p className="text-center">Электронная почта: {email}</p>
                    </>
                )}
                <div className="text-center">
                    <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeDashboard;
