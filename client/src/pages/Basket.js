import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getBasket } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';
import { getBasketItems } from '../store/selectors/deviceSelectors';
import Checkbox from '../components/Checkbox';

const Basket = () => {
    const basketItems = useSelector(getBasketItems);

    const dispatch = useDispatch();

    let totalPrice = 0;
    basketItems.map(price =>
        totalPrice += Number(price.device.price)
    );

    useEffect(() => {
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    }, []);

    return (
        <Container className="page-container basket-container">
            <h2>Cart</h2>
            <p className="basket-total-price">
                {basketItems.length} item{basketItems.length > 1 && 's'} worth: {totalPrice} $
            </p>
            <Checkbox label="Get a discount" />
            {basketItems.map((product) =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <img
                                    src={process.env.REACT_APP_API_URL + product.device.img}
                                    width={50}
                                    alt={product.device.name}
                                />
                                <h1 className="ps-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.device.price} $</h2>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
        </Container>
    );
};

export default Basket;
