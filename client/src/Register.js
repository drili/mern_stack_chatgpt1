import React, { useState } from "react"
import axios from "axios"

function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password
        }

        axios.post("http://localhost:5000/users/register", newUser)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <h3>Register</h3>
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register