import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/constants';
import { getIsAuth, getUser } from '../store/selectors/userSelectors';
import { userActions } from '../store/slices/userSlice';
import { notificationActions } from '../store/slices/notificationSlice';
import Logo from './Logo';

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
        dispatch(notificationActions.setNotification({
            message: 'Good bye',
        }));
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Logo size="logo-md" />
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
