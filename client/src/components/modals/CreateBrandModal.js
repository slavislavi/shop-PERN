import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceApi';

const CreateBrandModal = ({ show, onHide }) => {
    const [input, setInput] = useState('');

    const addBrand = () => {
        createBrand({ name: input }).then((data) => {
            setInput('');
            onHide();
        });
    };

    const onChangeBrand = (e) => setInput(e.target.value);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={input}
                        onChange={onChangeBrand}
                        placeholder="Enter brand name..."
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrandModal;
