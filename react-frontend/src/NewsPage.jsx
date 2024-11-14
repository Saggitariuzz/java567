import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsPage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Запрос к серверу для получения новостей
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Новости</h2>
            <ul className="list-group">
                {news.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <h5>{item.title}</h5>
                        <p>{item.content}</p>
                        <small>{new Date(item.date).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsPage;
