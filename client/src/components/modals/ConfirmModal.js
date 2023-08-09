import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, entity }) => {

    const deleteHandler = {
        type: () => { console.log('=====> delete type'); },
        brand: () => { console.log('=====> delete brand'); },
        device: () => { console.log('=====> delete device'); },
    };

    return (
        <Modal show={show} onHide={onHide} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`The ${entity.type} ${entity.name} will be deleted from database. Are you sure?`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={deleteHandler[entity.type]}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
