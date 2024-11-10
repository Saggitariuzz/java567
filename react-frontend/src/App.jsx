import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import CityPage from './CityPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header d-flex justify-content-between p-3">
          <Link to="/" className="btn btn-secondary">Арзамас</Link>
          <div>
            <Link to="/" className="btn btn-primary mx-2">Вход</Link>
            <Link to="/signup" className="btn btn-primary">Регистрация</Link>
          </div>
        </div>
        
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Routes>
            <Route path="/" element={<CityPage />} />
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
