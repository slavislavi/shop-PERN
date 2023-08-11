import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { deleteBrand, deleteDevice, deleteType, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';
import { deviceActions } from '../../store/slices/deviceSlice';

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

    const confirmationText = () => (
        <p>The {type} <span className="confirm-text">{name}</span> will be deleted from database. Are you sure?</p>
    );

    const deleteHandler = {
        type: () => {
            deleteType(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => dispatch(notificationActions.setNotification(error(e))))
                .finally(() => {
                    fetchTypes().then((data) => {
                        dispatch(deviceActions.setTypes(data));
                    });
                    onHide();
                });
        },
        brand: () => {
            deleteBrand(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => dispatch(notificationActions.setNotification(error(e))))
                .finally(() => {
                    fetchBrands().then((data) => {
                        dispatch(deviceActions.setBrands(data));
                    });
                    onHide();
                });
        },
        device: () => {
            deleteDevice(id)
                .then((data) => dispatch(notificationActions.setNotification(success)))
                .catch((e) => dispatch(notificationActions.setNotification(error(e))))
                .finally(() => {
                    fetchDevices(null, null, null, null, true).then((data) => {
                        dispatch(deviceActions.setDevices(data.rows));
                        dispatch(deviceActions.setTotalCount(data.count));
                    });
                    onHide();
                });
        },
    }[type];

    return (
        <Modal show={show} onHide={onHide} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirmationText()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={deleteHandler}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
