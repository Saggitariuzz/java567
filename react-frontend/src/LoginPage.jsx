// LoginPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError('Пожалуйста, введите логин и пароль.');
                return;
            }
            const response = await axios.post('http://localhost:8080/login', { username, password });
            console.log('Login successful:', response.data);
            navigate('/dashboard');  // Здесь используем navigate вместо history
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid username or password.');  
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Вход</h2>
                    <MDBInput
                        wrapperClass='mb-4'
                        placeholder='Электронная почта'
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
