import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault()

        const user = {
            username,
            password
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem("username", username)
                localStorage.setItem("email", res.data.user.email)
                localStorage.setItem("is_activated", res.data.user.is_activated)
                localStorage.setItem("profile_image", res.data.user.profile_image)
                localStorage.setItem("user_role", res.data.user.user_role)
                localStorage.setItem("user_title", res.data.user.user_title)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                navigate('/dashboard');

                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            })
            .catch(err => console.error(err));

        setUsername('');
        setPassword('');
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
}

export default Login