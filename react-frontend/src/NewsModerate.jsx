import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewsAdminPanel() {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-news', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setNews(response.data);
            } catch (error) {
                setError('Не удалось загрузить данные новостей');
            }
        };
        fetchNews();
    }, []);

    const deleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/delete-news/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setNews(news.filter(item => item.id !== id));
        } catch (e) {
            setError('Не удалось удалить новость');
        }
    };

    const editNews = (id) => {
        navigate(`/edit-news/${id}`); // Переход на страницу редактирования новости
    };

    const addNews = () => {
        navigate('/add-news'); // Переход на страницу добавления новости
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Панель управления новостями</h2>
            <div className="mb-4 text-end">
                <button className="btn btn-success" onClick={addNews}>Добавить новость</button>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            {!error && news.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Заголовок</th>
                            <th>Контент</th>
                            <th>Изображение</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.header}</td>
                                <td>{item.text}</td>
                                <td>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt="News"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    ) : (
                                        <span>Нет изображения</span>
                                    )}
                                </td>
                                <td className="d-flex flex-column gap-2">
                                    <button className="btn btn-primary" onClick={() => editNews(item.id)}>
                                        Редактировать
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteNews(item.id)}>
                                        Удалить
                                    </button>
                                </td>
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

export default NewsAdminPanel;