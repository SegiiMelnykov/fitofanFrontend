import { useAuthActions } from 'hooks/authActions';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { pathConst } from 'utils/pathConst';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);
    const { logOut } = useAuthActions();

    const handleLogOut = () => {
        logOut('');
        navigate(pathConst.HOME);
    }
    
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Link to="/" className='navbar-brand'>Your Todos</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </Nav>
                    {user.isAuth ? 
                        <div className='align-self-end' >
                            <Button variant="outline-primary" onClick={handleLogOut}>Logout</Button>
                        </div> : 
                        <div className='align-self-end'>
                            <Button variant="outline-primary" className='me-2' onClick={() => navigate(pathConst.LOGIN)}>Sign in</Button>
                            <Button variant="outline-info" onClick={() => navigate(pathConst.REGISTER)}>Sign up</Button>
                        </div> 
                    }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;