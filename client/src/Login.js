import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()

        const user = {
            username,
            password
        }

        axios.post("http://localhost:5000/users/login", user)
            .then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token)
            })
            .catch(err => console.error(err))

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