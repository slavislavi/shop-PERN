import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Admin = () => {
    return (
        <Container className="d-flex flex-column">
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add Type
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add Brand
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add Device
            </Button>

        </Container>

    );
};

export default Admin;
