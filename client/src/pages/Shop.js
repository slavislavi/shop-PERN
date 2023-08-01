import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';
import Pages from '../components/Pages';
import { getLimit, getPage, getSelectedBrand, getSelectedType } from '../store/selectors/deviceSelectors';
import LimitDropdown from '../components/LimitDropdown';

const Shop = () => {
    const page = useSelector(getPage);
    const limit = useSelector(getLimit);
    const selectedType = useSelector(getSelectedType);
    const selectedBrand = useSelector(getSelectedBrand);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTypes().then((data) => dispatch(deviceActions.setTypes(data)));
        fetchBrands().then((data) => dispatch(deviceActions.setBrands(data)));
        fetchDevices(null, null, 1, 8).then((data) => {
            dispatch(deviceActions.setDevices(data.rows));
            dispatch(deviceActions.setTotalCount(data.count));
        });
    }, []);

    useEffect(() => {
        fetchDevices(selectedType.id, selectedBrand.id, page, limit).then((data) => {
            dispatch(deviceActions.setDevices(data.rows));
            dispatch(deviceActions.setTotalCount(data.count));
        });
    }, [dispatch, limit, page, selectedBrand, selectedType]);

    return (
        <Container className="page-container">
            <Row>
                <Col md={3}>
                    <TypeBar />
                    <LimitDropdown />
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
