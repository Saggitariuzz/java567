// EditNewsForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditNewsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/get-news/${id}`);
                const { header, text } = response.data;
                setTitle(header);
                setContent(text);
            } catch (err) {
                setError('Не удалось загрузить новость.');
            }
        };

        fetchNews();
    }, [id]);

    const handleEditNews = async () => {
        const formData = new FormData();
        formData.append('header', title);
        formData.append('text', content);
        if (image) formData.append('image', image);
        formData.append('removeImage', removeImage);

        try {
            await axios.put(`http://localhost:8080/update-news/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            navigate('/news-admin');
        } catch (err) {
            setError('Не удалось обновить новость. Попробуйте еще раз.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Редактировать новость</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group mb-3">
                <label htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content">Контент</label>
                <textarea
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="image">Изображение</label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="removeImage"
                    checked={removeImage}
                    onChange={(e) => setRemoveImage(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="removeImage">
                    Удалить текущее изображение
                </label>
            </div>
            <button className="btn btn-primary" onClick={handleEditNews}>Сохранить</button>
        </div>
    );
}

export default EditNewsForm;
