import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand, fetchBrands } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';
import { deviceActions } from '../../store/slices/deviceSlice';
import { refineInput } from '../../utils/helpers';

const CreateBrandModal = ({ show, onHide }) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const refinedInput = refineInput(input);
    const isAddButtonDisabled = !(input.length);

    const successNotification = {
        message: `Brand ${refinedInput} in database now`,
        variant: 'success'
    };
    const errorNotification = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const addBrand = () => {
        createBrand({ name: refinedInput })
            .then((data) => {
                dispatch(notificationActions.setNotification(successNotification));
                setInput('');
            })
            .then(() => {
                fetchBrands().then((data) => {
                    dispatch(deviceActions.setBrands(data));
                });
                onHide();
            })
            .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))));
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
                <Button
                    variant="outline-success"
                    onClick={addBrand}
                    disabled={isAddButtonDisabled}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrandModal;
