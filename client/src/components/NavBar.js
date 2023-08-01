import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants';
import { getIsAuth, getUser } from '../store/selectors/userSelectors';
import { userActions } from '../store/slices/userSlice';

const NavBar = () => {
    const isAuth = useSelector(getIsAuth);
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toAdminPanelHandler = () => navigate(ADMIN_ROUTE);
    const toLoginPageHandler = () => navigate(LOGIN_ROUTE);
    const logoutHandler = () => {
        dispatch(userActions.setUser({}));
        dispatch(userActions.setIsAuth(false));
        localStorage.removeItem('token');
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}>
                    Shop <span className="logo-text">PERN</span>
                </NavLink>
                {isAuth ?
                    <Nav className="ml-auto">
                        {user?.role === "ADMIN" && <Button
                            variant="outline-light"
                            onClick={toAdminPanelHandler}
                        >
                            Admin Panel
                        </Button>}
                        <Button
                            variant="outline-light"
                            className="ms-2"
                            onClick={logoutHandler}
                        >
                            Log Out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant="outline-light"
                            onClick={toLoginPageHandler}
                        >
                            Log In
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;
