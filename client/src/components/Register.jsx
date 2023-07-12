import React, { useState } from "react"
import axios from "axios"

function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username, 
            password,
            email,
            isActivated:0,
            profileImage: "",
            userRole:0
        }

        axios.post("http://localhost:5000/users/register", newUser)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

        setUsername("")
        setPassword("")
        setEmail("")
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
                    <label>Email: </label>
                    <input type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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