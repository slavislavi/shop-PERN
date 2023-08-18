import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { deleteBrand, deleteDevice, deleteType, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';
import { notificationActions } from '../../store/slices/notificationSlice';
import { deviceActions } from '../../store/slices/deviceSlice';

const ConfirmDeleteModal = ({ show, onHide, entity }) => {
    const { id, type, name } = entity;
    const dispatch = useDispatch();

    const successNotification = {
        message: `${type} ${name} DELETED`,
        variant: 'success'
    };
    const errorNotification = (e) => ({
        message: e.response.data.message,
        variant: 'danger'
    });

    const confirmationText = () => (
        <p>The {type} <span className="confirm-text">{name}</span> will be deleted from database. Are you sure?</p>
    );

    const deleteHandler = {
        type: () => {
            deleteType(id)
                .then((data) => {
                    dispatch(notificationActions.setNotification(successNotification));
                    fetchTypes().then((data) => {
                        dispatch(deviceActions.setTypes(data));
                    });
                })
                .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))))
                .finally(() => onHide());
        },
        brand: () => {
            deleteBrand(id)
                .then((data) => {
                    dispatch(notificationActions.setNotification(successNotification));
                    fetchBrands().then((data) => {
                        dispatch(deviceActions.setBrands(data));
                    });
                })
                .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))))
                .finally(() => onHide());
        },
        device: () => {
            deleteDevice(id)
                .then((data) => {
                    dispatch(notificationActions.setNotification(successNotification));
                    fetchDevices(null, null, null, null, true).then((data) => {
                        dispatch(deviceActions.setDevices(data.rows));
                        dispatch(deviceActions.setTotalCount(data.count));
                    });
                })
                .catch((e) => dispatch(notificationActions.setNotification(errorNotification(e))))
                .finally(() => onHide());
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
