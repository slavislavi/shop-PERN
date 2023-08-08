import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';

const CreateBrandModal = ({ show, onHide }) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addBrand = () => {
        createBrand({ name: input }).then((data) => {
            dispatch(notificationActions.setNotification({
                message: 'New brand in database now',
                variant: 'success'
            }));
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
