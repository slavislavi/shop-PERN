import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceApi';

const CreateTypeModal = ({ show, onHide }) => {
    const [input, setInput] = useState('');

    const addType = () => {
        createType({ name: input }).then((data) => {
            setInput('');
            onHide();
        });
    };

    const onChangeType = (e) => setInput(e.target.value);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={input}
                        onChange={onChangeType}
                        placeholder="Enter type name..."
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTypeModal;
