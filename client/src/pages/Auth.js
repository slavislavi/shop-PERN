import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants';
import { login, registration } from '../http/userApi';
import { userActions } from '../store/slices/userSlice';

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
            } else {
                user = await registration(email, password);
            }
            dispatch(userActions.setUser(user));
            dispatch(userActions.setIsAuth(true));
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLoginPage ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter email..."
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter password..."
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
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
