import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, isPending, error } = useSignup();
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate thumbnail before calling signup
        if (!thumbnail) {
            setThumbnailError('Please select a file');
            return;
        }

        await signup(email, password, displayName, thumbnail);

        // Redirect to login page on successful signup
        navigate('/login');
    };

    const handleFileChange = (e) => {
        setThumbnailError(null);
        const selected = e.target.files[0];

        if (!selected) {
            setThumbnailError('Please select a file');
            return;
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image');
            return;
        }

        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100KB');
            return;
        }

        setThumbnail(selected);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

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

            <label>
                <span>Display Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>

            <label>
                <span>Profile Thumbnail:</span>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>

            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}
