// AddNewsForm.js// AddNewsForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddNewsForm({ onSuccess }) {
    const [header, setTitle] = useState('');
    const [text, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleAddNews = async () => {
        const formData = new FormData();
        formData.append('header', header);
        formData.append('text', text);
        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:8080/add-news', formData, {
                withCredentials: true,
            });
        } catch (err) {
            setError('Не удалось добавить новость. Попробуйте еще раз.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Добавить новость</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group mb-3">
                <label htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={header}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content">Контент</label>
                <textarea
                    className="form-control"
                    id="content"
                    value={text}
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
            <button className="btn btn-primary" onClick={handleAddNews}>Добавить</button>
        </div>
    );
}

export default AddNewsForm;

