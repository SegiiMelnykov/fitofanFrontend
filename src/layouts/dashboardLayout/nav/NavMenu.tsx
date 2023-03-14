import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navMenu.css';



const NavMenu = () => {
    return (
        <div className='nav-menu'>
            <Nav className="flex-column">
                <Link to="/dashboard/tasks" className="nav-link" >Tasks</Link>
            </Nav>
        </div>
    );
};

export default NavMenu;