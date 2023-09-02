import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Container, Form, Row, FloatingLabel } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants';
import { login, registration } from '../http/userApi';
import { userActions } from '../store/slices/userSlice';
import { notificationActions } from '../store/slices/notificationSlice';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === LOGIN_ROUTE;

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const onSubmitAuth = async () => {
        try {
            let user;
            if (isLoginPage) {
                user = await login(email, password);
                dispatch(notificationActions.setNotification({
                    message: `Welcome, ${user.email}!`,
                    variant: 'success'
                }));
            } else {
                user = await registration(email, password);
                dispatch(notificationActions.setNotification({
                    message: 'Successfully registered!',
                    variant: 'success'
                }));
            }
            dispatch(userActions.setUser(user));
            dispatch(userActions.setIsAuth(true));
            navigate(SHOP_ROUTE);
        } catch (e) {
            dispatch(notificationActions.setNotification({
                message: e.response.data.message,
                variant: 'danger'
            }));
        }
    };

    useEffect(() => {
        document.title = 'Authorization';
    }, []);

    return (
        <Container
            className="d-flex justify-content-center align-items-center page-container"
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLoginPage ? "Sign in" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <FloatingLabel
                        label="Email"
                        className="mb-3 mt-3"
                    >
                        <Form.Control
                            placeholder="Enter email..."
                            value={email}
                            onChange={onChangeEmail}
                            size="lg"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="Enter password..."
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                            size="lg"
                        />
                    </FloatingLabel>

                    <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
                        {isLoginPage ?
                            <div style={{ width: "auto" }} className="p-0">
                                Are you not registered? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                            </div>
                            :
                            <div style={{ width: "auto" }} className="p-0">
                                Already registered? <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>
                            </div>
                        }
                        <Button
                            variant="outline-success"
                            style={{ width: "auto" }}
                            onClick={onSubmitAuth}
                        >
                            {isLoginPage ? "Sign In" : "Register"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
