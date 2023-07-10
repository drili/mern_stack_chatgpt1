import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <section>
                <h1>Hello World - Welcome</h1>
            </section>

            <section>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </section>
        </div>
    )
}

export default Home