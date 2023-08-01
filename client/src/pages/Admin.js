import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateTypeModal from '../components/modals/CreateTypeModal';
import CreateBrandModal from '../components/modals/CreateBrandModal';
import CreateDeviceModal from '../components/modals/CreateDeviceModal';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const openTypeModalHandler = () => setTypeVisible(true);
    const openBrandModalHandler = () => setBrandVisible(true);
    const openDeviceModalHandler = () => setDeviceVisible(true);

    const closeTypeModalHandler = () => setTypeVisible(false);
    const closeBrandModalHandler = () => setBrandVisible(false);
    const closeDeviceModalHandler = () => setDeviceVisible(false);

    return (
        <Container className="d-flex flex-column page-container" style={{ width: '25%' }}>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={openTypeModalHandler}
            >
                Add Type
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={openBrandModalHandler}
            >
                Add Brand
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={openDeviceModalHandler}
            >
                Add Device
            </Button>
            <CreateTypeModal show={typeVisible} onHide={closeTypeModalHandler} />
            <CreateBrandModal show={brandVisible} onHide={closeBrandModalHandler} />
            <CreateDeviceModal show={deviceVisible} onHide={closeDeviceModalHandler} />
        </Container>

    );
};

export default Admin;
