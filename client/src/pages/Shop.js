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
import PaginationBar from '../components/PaginationBar';
import { getLimit, getPage, getSelectedBrand, getSelectedType, getTotalCount } from '../store/selectors/deviceSelectors';
import LimitDropdown from '../components/LimitDropdown';
import GoToTopButton from '../components/GoToTopButton';
import { useScroll } from '../utils/helpers';
import { SCROLL_FROM_TOP } from '../utils/constants';

const Shop = () => {
    const page = useSelector(getPage);
    const limit = useSelector(getLimit);
    const totalCount = useSelector(getTotalCount);
    const selectedType = useSelector(getSelectedType);
    const selectedBrand = useSelector(getSelectedBrand);
    const scrollPosition = useScroll();

    const hasDevicesOnPage = totalCount > 0;
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTypes().then((data) => dispatch(deviceActions.setTypes(data)));
        fetchBrands().then((data) => dispatch(deviceActions.setBrands(data)));
        fetchDevices(null, null, 1, 8).then((data) => {
            dispatch(deviceActions.setDevices(data.rows));
            dispatch(deviceActions.setTotalCount(data.count));
        });
    }, [dispatch]);

    useEffect(() => {
        fetchDevices(selectedType.id, selectedBrand.id, page, limit).then((data) => {
            dispatch(deviceActions.setDevices(data.rows));
            dispatch(deviceActions.setTotalCount(data.count));
        });
    }, [dispatch, limit, page, selectedBrand, selectedType]);

    const setCurrentPage = (pageNumber) => dispatch(deviceActions.setPage(pageNumber));

    return (
        <Container className="page-container">
            <Row>
                <Col md={3}>
                    <TypeBar />
                    <LimitDropdown />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    {hasDevicesOnPage
                        ? <DeviceList />
                        : <h3 className="no-products-text">Products will be added soon</h3>}
                    <PaginationBar
                        currentPage={page}
                        limit={limit}
                        totalCount={totalCount}
                        setCurrentPage={setCurrentPage}
                    />
                </Col>
            </Row>
            <GoToTopButton visible={scrollPosition > SCROLL_FROM_TOP} />
        </Container>
    );
};

export default Shop;
