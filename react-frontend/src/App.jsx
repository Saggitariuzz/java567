import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import Dashboard from './DashBoard';
import CityPage from './CityPage';
import CurrentTime from './CurrentTime';
import NewsPage from './NewsPage';
import AuthButtons from './AuthButtons';

function App() {
  const [buttonsStatus, setButtonsStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Функция для запроса состояния авторизации
    const getButtons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/checklogin", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setButtonsStatus(response.status); // Устанавливаем статус кнопок
      } catch (error) {
        setError("Не удалось загрузить кнопки");
        console.error(error);
      }
    };

    // Запрос состояния при монтировании компонента
    getButtons();

    // Таймер для регулярной проверки состояния
    const intervalId = setInterval(() => {
      getButtons();  // Обновляем состояние каждые 1 секунду
    }, 1000);
    

    // Очистка таймера при размонтировании компонента
    return () => clearInterval(intervalId);

  }, []);  // Пустой массив зависимостей, чтобы запрос выполнялся только при монтировании

  return (
    <div className="App">
      <Router>
        <div className="header d-flex justify-content-between align-items-center p-3">
          <div className="d-flex align-items-center">
            <Link to="/" className="btn btn-secondary">Арзамас</Link>
            <Link to="/news" className="btn btn-secondary mx-2">Новости</Link>
          </div>
          
          <div className="current-time">
            <CurrentTime />
          </div>

          {/* Используем компонент AuthButtons для отображения кнопок */}
          <div>
            <AuthButtons buttonsStatus={buttonsStatus} />
          </div>
        </div>
        
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Routes>
            <Route path="/" element={<CityPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
