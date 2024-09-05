import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import './Navbar.css';
import TodoLogo from '../assets/todo-logo.png';

export default function Navbar() {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();

    return (
        <div className="navbar">
            <div className="navbar-left">
                <li className="logo">
                    <img src={TodoLogo} alt="todo logo" />
                    <span>Todoist</span>
                </li>
            </div>

            <div className="navbar-right">
                <ul>
                    {!user && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}

                    {user && (
                        <li>
                            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                            {isPending && <button className="btn" disabled>Logging out...</button>}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
