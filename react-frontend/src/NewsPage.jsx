import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NewsPage() {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-news');
                setNews(response.data);
                setError(''); // Очистить ошибки, если запрос успешен
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Ошибка при загрузке новостей. Попробуйте позже.');
            }
        };
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/check-access', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                setStatus(response.status);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleModerPanelClick = () => {
        navigate('/moder-panel'); // Путь на панель администратора
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Новости</h2>
            <div className="text-center mb-5">
            {
                    status == 200 ?(
                        <button type="button" className="btn btn-primary" onClick={handleModerPanelClick}>
                            Добавить/редактировать новости.
                        </button>
                    ):(
                        null
                    )
                }
            </div>
            {error && <p className="text-danger text-center">{error}</p>} {/* Вывод сообщения об ошибке */}

            {news.length === 0 && !error ? (
                <p className="text-center">Новостей пока нет.</p>
            ) : (
                <ul className="list-group">
                    {news.map((item) => (
                        <li key={item.id} className="list-group-item">
                            <h5>{item.title}</h5>
                            <p>{item.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewsPage;
