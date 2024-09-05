import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className='sidebar-content'>
                <div className='user'>
                    <p>Hey user</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <FontAwesomeIcon icon={faHouseChimney} /> {/* Use the imported icon */}
                                <span> Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/create">
                                <FontAwesomeIcon icon={faPlus} /> {/* Use the imported icon */}
                                <span> Add Tasks</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
