import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType, fetchTypes } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';
import { deviceActions } from '../../store/slices/deviceSlice';

const CreateTypeModal = ({ show, onHide }) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const successNotification = {
        message: `Type ${input} in database now`,
        variant: 'success'
    };
    const errorNotification = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const addType = () => {
        createType({ name: input })
            .then((data) => {
                dispatch(notificationActions.setNotification(successNotification));
                setInput('');
            })
            .then(() => {
                fetchTypes().then((data) => {
                    dispatch(deviceActions.setTypes(data));
                });
                onHide();
            })
            .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))));
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
