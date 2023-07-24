import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchTypes } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTypes().then((data) => dispatch(deviceActions.setTypes(data)));
        fetchBrands().then((data) => dispatch(deviceActions.setBrands(data)));
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
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
