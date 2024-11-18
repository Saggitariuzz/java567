// LoginPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const message = location.state?.message;

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError('Пожалуйста, введите логин и пароль.');
                return;
            }
            const response = await axios.post('http://localhost:8080/login', { username, password },
                {withCredentials: true,
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log('Login successful:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Неправильный логин или пароль');  
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Вход</h2>
                    {message && <div className="mb-4 text-center">{message}</div>}
                    <MDBInput
                        wrapperClass='mb-4'
                        placeholder='Имя пользователя'
                        id='email'
                        value={username}
                        type='email'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-4'
                        placeholder='Пароль'
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        className="mb-4 d-block btn-primary"
                        style={{ height: '50px', width: '100%' }}
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                    <div className="text-center">
                        <p>Еще не зарегистрированы? <a href="/signup">Регистрация</a></p>
                    </div>

                </MDBContainer>
            </div>
        </div>
    );
}

export default LoginPage;
