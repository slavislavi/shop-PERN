import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { getBrands, getTypes } from '../../store/selectors/deviceSelectors';

const CreateDeviceModal = ({ show, onHide }) => {
    const [info, setInfo] = useState([]);

    const types = useSelector(getTypes);
    const brands = useSelector(getBrands);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => () => {
        setInfo(info.filter((infoItem) => infoItem.number !== number));
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>Select the type</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map((type) =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>Select the brand</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map((brand) =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the name..."
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the price..."
                        type="number"
                    />

                    <Form.Control
                        className="mt-3"
                        type="file"
                    />
                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Add new characteristic
                    </Button>
                    {info.map((infoItem) =>
                        <Row className="mt-4" key={infoItem.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Enter title"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Enter description"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={removeInfo(infoItem.number)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDeviceModal;
