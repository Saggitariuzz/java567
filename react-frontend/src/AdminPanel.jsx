import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getusers', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setUsers(response.data);
            } catch (error) {
                setError('Не удалось загрузить данные пользователей');
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (message) {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [message]);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
            setUsers(users.filter(user => user.id !== id));
        } catch (e) {
            setError('Не удалось удалить пользователя');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Панель администратора</h2>
            <ToastContainer/>
            <div className='text-center mb-3'>
                <Link to={"/add-user"} className="btn btn-primary">Добавить пользователя</Link>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            {!error && users.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя пользователя</th>
                            <th>Электронная почта</th>
                            <th>Роль</th>
                            <th>Аватар</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><img src={user.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '60px' }} /></td>
                                {user.id === 1 ?(
                                    <td className='d-flex flex-column'>
                                        <Link
                                            to={`/update/${user.id}`}
                                            className = "btn btn-primary"
                                        >
                                            Изменить
                                        </Link>
                                    </td>
                                ):(
                                    <td className='d-flex flex-column gap-3'>
                                        <Link
                                            to={`/update/${user.id}`}
                                            className = "btn btn-primary"
                                        >
                                            Изменить
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Удалить</button>
                                    </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Нет данных для отображения</p>
            )}
        </div>
    );
}

export default AdminPanel;
