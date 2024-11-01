import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from '../modell/editorUtils';
import { useSocket } from '../../context/SocketContext';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError } = useMessage();
    const { connectSocket } = useSocket();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/login';
        const userData = { email, password };

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            };
            const response = await fetch(url, requestOptions);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.data.token);
                connectSocket(data.data.token);
                navigate('/documents');
            } else {
                setError('Failed to login. Please try again');
            }
        } catch (error) {
            setError('Failed to login. Please try again');
            console.error(error);
        }
    };

    return (
        <div class="content-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div class="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <div>
                    <input
                        class='login'
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <label htmlFor='password'>Password:</label>
                <div>    
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button class="login-button" type='submit'>Login</button>
                <button class="orange-button" onClick={() => navigate('/register')}>
                Click here to register
                </button>
                <a 
                href="/request-reset-password"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    navigate('/request-reset-password');
                }}>
                Can't log in?
                </a>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
