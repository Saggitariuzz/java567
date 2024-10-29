import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [timeerror, setTimeerror] = useState('');
    const [time, setTime] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError('Please enter both username and password.');
                return;
            }
            const response = await axios.post('http://localhost:8081/auth/signin', { username, password });
            console.log('Login successful:', response.data);
            history('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid username or password.');
        }
    };

    const handleTime = async() => {
        try{
            const response = await axios.get("http://localhost:8080/time");
            setTime(response.data);
        }catch(err){
            setTimeerror("Не удалось отобразить время");
        }

    }

    useEffect(() =>{
        handleTime();
        const interval = setInterval(()=>{
            handleTime();
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Login Page</h2>
                    <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' value={username} type='email' onChange={(e) => setUsername(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */}
                    <button className="mb-4 d-block btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Sign in</button>
                    <div className="text-center">
                        <p>Not a member? <a href="/signup" >Register</a></p>
                    </div>
                    {timeerror ? (
                        <p className="text-center">{timeerror}</p>
                    ):(
                        <p className='text-center'>{time}</p>
                    )}
                </MDBContainer>
            </div>
        </div>
    );
}

export default LoginPage;