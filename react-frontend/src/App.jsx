import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SingleUpPage';
import Dashboard from "./DashBoard";

function App() {
  return (
      <div className="App">
      <Router>

            <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={ <SignupPage/>} />
                <Route path = "/dashboard" element={<Dashboard/>}/>
            </Routes>

      </Router>
      </div>
  );
}

export default App;