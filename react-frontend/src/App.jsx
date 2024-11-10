import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import CityPage from './CityPage';
import CurrentTime from './CurrentTime';
import NewsPage from './NewsPage'; // Импортируем компонент новостей

function App() {
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

          <div>
            <Link to="/login" className="btn btn-primary mx-2">Вход</Link>
            <Link to="/signup" className="btn btn-primary">Регистрация</Link>
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
