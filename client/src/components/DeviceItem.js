import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Col, Image } from 'react-bootstrap';
import { DEVICE_ROUTE } from '../utils/constants';
import star from '../assets/star.png';

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();

    const toDeviceDetailsHandler = () => navigate(`${DEVICE_ROUTE}/${device.id}`);

    return (
        <Col md={3} className="mt-3" onClick={toDeviceDetailsHandler}>
            <Card border="light" className="device-card">
                <Image
                    width={150}
                    height={150}
                    src={process.env.REACT_APP_API_URL + device.img}
                />
                <div className="d-flex mt-1 justify-content-between align-items-center">
                    <div className="text-black-50">{device?.brand?.name}</div>
                    <div className="d-flex align-items-center">
                        <div className="me-1">{device.rating}</div>
                        <Image src={star} width={18} height={18} />
                    </div>
                </div>
                <div>{device.name}</div>
                <div className="device-price">{device.price} $</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
