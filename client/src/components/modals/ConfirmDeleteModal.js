import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { deleteBrand, deleteDevice, deleteType } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';

const ConfirmDeleteModal = ({ show, onHide, entity }) => {
    const { id, type, name } = entity;
    const dispatch = useDispatch();

    const success = {
        message: `${type} ${name} DELETED`,
        variant: 'success'
    };
    const error = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const deleteHandler = {
        type: () => {
            deleteType(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => {
                    console.log(e);
                    dispatch(notificationActions.setNotification(error(e)));
                })
                .finally(() => onHide());
        },
        brand: () => {
            deleteBrand(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => dispatch(notificationActions.setNotification(error(e))))
                .finally(() => onHide());
        },
        device: () => {
            deleteDevice(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => dispatch(notificationActions.setNotification(error(e))))
                .finally(() => onHide());
        },
    };

    return (
        <Modal show={show} onHide={onHide} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`The ${type} ${name} will be deleted from database. Are you sure?`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={deleteHandler[type]}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
