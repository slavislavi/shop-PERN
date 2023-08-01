import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className="footer">
            <Container fluid>
                <Row className="socials">
                    <a href="/">Facebook</a>
                    <a href="/">Twitter</a>
                    <a href="/">Instagram</a>
                    <a href="/">Telegram</a>
                    <a href="/">YouTube</a>
                </Row>
                <div className="footer-copyright text-center">
                    © 2023 Copyright:
                    <a href="https://github.com/slavislavi/shop-PERN"> SLAVIO</a>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
