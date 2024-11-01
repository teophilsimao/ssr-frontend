import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMessage } from '../modell/editorUtils';

const UserRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError, message, setMessage } = useMessage();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const emailQuery = new URLSearchParams(location.search);
        const theEmail = emailQuery.get('email')

        if (theEmail) {
            setEmail(theEmail);
        }
    }, [location.search]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/register';
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

            if (response.ok) {
                setMessage('Please check your email to verify your account. Once verified, you can log in.');
            }
        } catch (error) {
            setError('Failed to register. Please try again');
            console.error(error);
        }
    };

    return (
        <div class="content-container">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
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
                    <button class="orange-button" type='submit'>Register</button>
                    <button onClick={() => navigate('/')}>
                    Click here to login
                </button>
                </form>  
            </div>
        </div>
    );
};

export default UserRegister;
