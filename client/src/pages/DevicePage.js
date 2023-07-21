import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import cart from '../assets/cart.png';

const DevicePage = () => {
    const device = { id: 1, name: 'Apple iphone 14 pro', price: 1400, rating: 5, img: 'https://img.5element.by/import/images/ut/goods/good_077c5dc7-06a8-11ee-bb93-005056012465/-1_600.jpg' };

    const description = [
        { id: 1, title: 'RAM', description: '6 Gb' },
        { id: 2, title: 'Camera', description: '12 Mpx' },
        { id: 3, title: 'Processor', description: 'M1 pro' },
        { id: 4, title: 'Core', description: '10' },
        { id: 5, title: 'Battery', description: '4200 mA' },
    ];

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image src={device.img} width={300} height={300} />
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
                {description.map((info, index) =>
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
