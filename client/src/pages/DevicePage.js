import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import cart from '../assets/cart.png';
import { addToBasket, fetchOneDevice, getBasket } from '../http/deviceApi';
import { notificationActions } from '../store/slices/notificationSlice';
import { deviceActions } from '../store/slices/deviceSlice';
import { priceFormatter } from '../utils/helpers';

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [price, setPrice] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();

    const successNotification = {
        message: `${device.name} is in the cart`,
        variant: 'success'
    };

    const errorNotification = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const addToBasketHandler = () => {
        const formData = new FormData();
        formData.append('deviceId', id);
        addToBasket(formData)
            .then((res) => dispatch(notificationActions.setNotification(successNotification)))
            .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))));
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    };

    useEffect(() => {
        fetchOneDevice(id).then((data) => {
            setDevice(data);
            setPrice(priceFormatter.format(data.price));
        });
    }, []);

    return (
        <Container className="page-container">
            <Row>
                <Col md={5}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        className="device-page-image"
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: "cover", fontSize: 64 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={3}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: "5px solid lightgray" }}
                    >
                        <h3>{price}</h3>
                        <Row className="d-flex">
                            <Button
                                variant="outline-dark"
                                style={{ width: "auto" }}
                                onClick={addToBasketHandler}
                            >
                                Add to cart
                            </Button>
                            <Image src={cart} width={50} height={50} style={{ width: "auto" }} />
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3 mb-5">
                <h2 className="details-text">Details:</h2>
                {device.info.map((info) =>
                    <Row key={info.id} className="infoRow">
                        <div>{info.title}:</div>
                        <div>{info.description}</div>
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
