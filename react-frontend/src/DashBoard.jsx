// WelcomeDashboard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeDashboard() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [avatar, setAvatar] = useState(null);  // Для хранения изображения
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/dashboard', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setUsername(response.data.username);  // Устанавливаем username
                setEmail(response.data.email); 
                setRole(response.data.role);
                setId(response.data.id);
                if (response.data.avatar) {
                    setAvatar(`data:image/jpeg;base64,${response.data.avatar}`);
                }
            } catch (error) {
                setError('Не удалось загрузить информацию о пользователе');
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);  // Пустой массив зависимостей, чтобы запрос выполнялся только при монтировании компонента

    const handleLogout = async() =>{
        try{
            const response = await axios.get('http://localhost:8080/logout', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate('/');    
        }catch(error){
            setError('Не удалось выйти');
            console.error(error);
        }
    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: '400px' }}>
                <h2 className="text-center">Добро пожаловать!</h2>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <>
                        <div className="text-center">
                            {avatar && <img src={avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '60px' }} />}
                        </div>
                        
                        <p className="text-center">ID: {id}</p>
                        <p className="text-center">Имя пользователя: {username}</p>
                        <p className="text-center">Электронная почта: {email}</p>
                        <p className="text-center">Роль: {role}</p>
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
