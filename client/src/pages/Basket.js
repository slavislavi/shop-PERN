import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { getBasket } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';
import { getBasketItems } from '../store/selectors/deviceSelectors';

const Basket = () => {
    const basketItems = useSelector(getBasketItems);

    const dispatch = useDispatch();

    useEffect(() => {
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    }, []);

    return (
        <Container className="page-container">
            BASKET PAGE
        </Container>
    );
};

export default Basket;
