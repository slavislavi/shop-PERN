import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { getBrands, getSelectedBrand, getSelectedType, getTypes } from '../../store/selectors/deviceSelectors';
import { deviceActions } from '../../store/slices/deviceSlice';
import { notificationActions } from '../../store/slices/notificationSlice';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';

const CreateDeviceModal = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    const types = useSelector(getTypes);
    const brands = useSelector(getBrands);
    const selectedType = useSelector(getSelectedType);
    const selectedBrand = useSelector(getSelectedBrand);
    const dispatch = useDispatch();

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map((infoRow) =>
            infoRow.number === number ? { ...infoRow, [key]: value } : infoRow));
    };

    const removeInfo = (number) => () => {
        setInfo(info.filter((infoRow) => infoRow.number !== number));
    };

    const onChangeInfoTitle = (infoRow) => (e) => changeInfo('title', e.target.value, infoRow.number);
    const onChangeInfoDescription = (infoRow) => (e) => changeInfo('description', e.target.value, infoRow.number);

    const onChangeName = (e) => setName(e.target.value);
    const onChangePrice = (e) => setPrice(Number(e.target.value));

    const onSetSelectedType = (type) => () => dispatch(deviceActions.setSelectedType(type));
    const onSetSelectedBrand = (brand) => () => dispatch(deviceActions.setSelectedBrand(brand));

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', selectedBrand.id);
        formData.append('typeId', selectedType.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData)
            .then((data) => {
                dispatch(notificationActions.setNotification({
                    message: 'New device in database now',
                    variant: 'success'
                }));
            })
            .then(() => {
                fetchDevices(null, null, null, null, true).then((data) => {
                    dispatch(deviceActions.setDevices(data.rows));
                    dispatch(deviceActions.setTotalCount(data.count));
                });
                onHide();
            });
    };

    useEffect(() => {
        fetchTypes().then((data) => dispatch(deviceActions.setTypes(data)));
        fetchBrands().then((data) => dispatch(deviceActions.setBrands(data)));
    }, []);

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
                        <Dropdown.Toggle className="dropdown-toggler">
                            {selectedType.name || "Select the type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                            {types.map((type) =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={onSetSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="dropdown-toggler">
                            {selectedBrand.name || "Select the brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                            {brands.map((brand) =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={onSetSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the name..."
                        value={name}
                        onChange={onChangeName}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the price..."
                        type="number"
                        value={price}
                        onChange={onChangePrice}
                    />

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Add new characteristic
                    </Button>
                    {info.map((infoRow) =>
                        <Row className="mt-4" key={infoRow.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={info.title}
                                    onChange={onChangeInfoTitle(infoRow)}
                                    placeholder="Enter title"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={info.description}
                                    onChange={onChangeInfoDescription(infoRow)}
                                    placeholder="Enter description"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={removeInfo(infoRow.number)}
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
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDeviceModal;
