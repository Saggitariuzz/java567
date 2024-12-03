import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBContainer,
    MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [avatar, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        setError('');
        if(!username || !email || !password) {
            setError("Пожалуйста, заполните все поля");
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        try {
            const response = await axios.post(`http://localhost:8080/adduser`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate('/admin-panel', {state:{message: "Данные сохранены"}});
        } catch (error) {
            console.error('Ошибка запроса:', error.response || error.message);
            setError(error.response?.data?.message || 'Ошибка при обновлении данных');
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ width: '600px', height: '550px' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Добавление пользователя</h2>
                    {error && <p className="text-danger">{error}</p>}
                            <p>Имя пользователя</p>
                            <MDBInput
                                wrapperClass="mb-3"
                                id="fullName"
                                placeholder="Имя пользователя"
                                value={username}
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p>Адрес электронной почты</p>
                            <MDBInput
                                wrapperClass="mb-3"
                                placeholder="Адрес электронной почты"
                                id="email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p>Пароль</p>
                            <MDBInput
                                wrapperClass="mb-3"
                                placeholder="Пароль"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p>Роль</p>
                            <select
                                className="form-select mb-3"
                                value="USER"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="MODER">MODER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <p>Аватар</p>
                            <MDBInput
                                wrapperClass="mb-3"
                                type="file"
                                accept="image/*"
                                id="avatar"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                            <button
                                className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                                style={{ height: '40px', width: '100%' }}
                                onClick={handleSave}
                            >
                                Сохранить
                            </button>
                </MDBContainer>
            </div>
        </div>
    );
}

export default UpdateUser;