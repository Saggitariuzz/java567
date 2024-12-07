import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function UpdateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [deleteAvatar, setDeleteAvatar] = useState(false);
    const [avatar, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getinfo/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUsername(response.data.username);
            setEmail(response.data.email);
            setRole(response.data.role);
        } catch (error) {
            setError("Не удалось получить данные");
        }
    };

    const handleUpdate = async () => {
        setError('');
    
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('deleteAvatar', deleteAvatar);
        if(password !== ''){
            const hashedPassword = CryptoJS.SHA256(password).toString();
            formData.append('password', hashedPassword);
        }
        if (avatar) {
            formData.append('avatar', avatar);
        }
        try {
            const response = await axios.put(`http://localhost:8080/update/${id}`, formData, {
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
    

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ width: '600px', height: '550px' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Обновление данных</h2>
                    {error && <p className="text-danger">{error}</p>}
                    {error === "" && (
                        <>
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
                            <p className='fst-italic'>*Оставьте поле пустым, если не требуется изменять пароль</p>
                            <p>Роль</p>
                            <select
                                disabled={id == 1}
                                className="form-select mb-3"
                                value={role || ''}
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
                            <MDBCheckbox
                                wrapperClass="mb-3"
                                id="deleteavatarcheckbox"
                                label="Удалить аватар"
                                checked={deleteAvatar}
                                onChange={(e) => setDeleteAvatar(e.target.checked)}
                            />
                            <button
                                className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                                style={{ height: '40px', width: '100%' }}
                                onClick={handleUpdate}
                            >
                                Сохранить
                            </button>
                        </>
                    )}
                </MDBContainer>
            </div>
        </div>
    );
}

export default UpdateUser;