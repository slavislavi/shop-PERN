import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';
import Pages from '../components/Pages';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTypes().then((data) => dispatch(deviceActions.setTypes(data)));
        fetchBrands().then((data) => dispatch(deviceActions.setBrands(data)));
        fetchDevices().then((data) => dispatch(deviceActions.setDevices(data.rows)));
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
