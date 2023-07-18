import React, { useSelector } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { getIsAuth } from '../store/selectors/userSelectors';
import { SHOP_ROUTE } from '../utils/constants';

const NavBar = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{ color: 'white' }}>Shop PERN</NavLink>
                {isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant="outline-light">Admin Panel</Button>
                        <Button variant="outline-light" className="ml-2">Log Out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant="outline-light">Log In</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;
