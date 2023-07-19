import React from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';

const Auth = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === LOGIN_ROUTE;

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
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter password..."
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
