import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isPending, error } = useLogin();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        if (!error) {
            navigate('/'); // Navigate to the dashboard after successful login
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}
