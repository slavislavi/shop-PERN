import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import cart from '../assets/cart.png';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data));
    }, []);

    return (
        <Container className="mt-3 page-container">
            <Row>
                <Col md={4}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        width={300}
                        height={300}
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
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: "5px solid lightgray" }}
                    >
                        <h3>{device.price} $</h3>
                        <Row className="d-flex">
                            <Button variant="outline-dark" style={{ width: "auto" }}>
                                Add to cart
                            </Button>
                            <Image src={cart} width={50} height={50} style={{ width: "auto" }} />
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Details:</h1>
                {device.info.map((info, index) =>
                    <Row
                        key={info.id}
                        style={{ background: !(index % 2) && "lightgray", padding: 10 }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
