import React from 'react';
import Button from 'react-bootstrap/Button';
import { scrollToTop } from '../utils/helpers';

const GoToTopButton = ({ visible = true }) => {
    return (
        <Button
            className={`go-to-top-btn ${visible && "go-to-top-btn-visible"}`}
            onClick={scrollToTop}
            variant="dark"
        >
            UP
        </Button>
    );
};

export default GoToTopButton;
