import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getBasket } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';
import { getBasketItems } from '../store/selectors/deviceSelectors';

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
        <Container className="page-container d-flex flex-sm-column justify-content-center align-items-center">
            <h1 className="pb-2">Cart</h1>
            <Card className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
                <h1 className="pe-2">Total price:</h1>
                <h3 className="ps-2">
                    {totalPrice}
                    <span className="font-weight-light ps-2">$</span>
                </h3>
            </Card>
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
