import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { removeFromBasket, getBasket } from '../http/basketApi';
import { deviceActions } from '../store/slices/deviceSlice';
import { getBasketItems } from '../store/selectors/deviceSelectors';
import { notificationActions } from '../store/slices/notificationSlice';
import Checkbox from '../components/Checkbox';
import { priceFormatter } from '../utils/helpers';
import cart from '../assets/cart.png';

const DISCOUNT = 5;

const Basket = () => {
    const [hasDiscount, setHasDiscount] = useState(false);
    const basketItems = useSelector(getBasketItems);
    const dispatch = useDispatch();

    const totalPrice = basketItems.reduce((acc, { device }) => acc + device.price, 0);
    const newPrice = Math.ceil(totalPrice - (totalPrice / 100 * DISCOUNT));
    const strikethroughPrice = hasDiscount ? 'strikethrough-price' : null;

    const errorNotification = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const toggleDiscount = () => setHasDiscount((prev) => !prev);

    const deleteItemFromBasket = () => (id) => {
        removeFromBasket(id)
            .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))));
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    };

    useEffect(() => {
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    }, [dispatch]);

    return (
        <Container className="page-container basket-container">
            <h2>Cart</h2>
            <div className="total-price-container">
                <Image src={cart} width={60} height={60} />
                <p className="basket-total-price">
                    {basketItems.length} item{basketItems.length > 1 && "s"} worth: <span className={strikethroughPrice}>{priceFormatter.format(totalPrice)}</span>
                    {hasDiscount && <span className="price-with-discount">
                        {priceFormatter.format(newPrice)}
                    </span>}
                </p>
            </div>
            <Checkbox
                checked={hasDiscount}
                label="Get a discount"
                onCheckedText="Got it!"
                notCheckedText={`Your discount is ${DISCOUNT}%`}
                onChange={toggleDiscount}
            />
            <Col md={8} className="basket-list-container">
                {basketItems.map(({ id, device }) =>
                    <Card className="basket-item-card" key={id}>
                        <Row className="d-flex w-100">
                            <Col md={9}>
                                <div className="d-flex flex-row align-items-center">
                                    <img
                                        src={process.env.REACT_APP_API_URL + device.img}
                                        width={50}
                                        alt={device.name}
                                    />
                                    <p className="basket-item-name">{device.name}</p>
                                </div>
                            </Col>
                            <Col md={1} className="basket-item-delete-btn-container">
                                <Button
                                    className="basket-item-delete-btn"
                                    variant="outline-dark"
                                    onClick={deleteItemFromBasket(id)}
                                >
                                    &#x2715;
                                </Button>
                            </Col>
                            <Col md={2}>
                                <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                    <p className="basket-item-price">
                                        {priceFormatter.format(device.price)}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Col>
        </Container>
    );
};

export default Basket;
