import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, Table } from 'react-bootstrap';
import CreateTypeModal from '../components/modals/CreateTypeModal';
import CreateBrandModal from '../components/modals/CreateBrandModal';
import CreateDeviceModal from '../components/modals/CreateDeviceModal';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import { getBrands, getDevices, getTypes } from '../store/selectors/deviceSelectors';
import { fetchDevices } from '../http/deviceApi';
import { deviceActions } from '../store/slices/deviceSlice';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [currentEntity, setCurrentEntity] = useState({ type: '', name: '', id: null });

    const types = useSelector(getTypes);
    const brands = useSelector(getBrands);
    const devices = useSelector(getDevices);

    const dispatch = useDispatch();

    const openTypeModalHandler = () => setTypeVisible(true);
    const openBrandModalHandler = () => setBrandVisible(true);
    const openDeviceModalHandler = () => setDeviceVisible(true);
    const openConfirmModalHandler = (entity) => (e) => {
        setCurrentEntity({ type: e.target.dataset.type, name: entity.name, id: entity.id });
        setConfirmVisible(true);
    };

    const closeModalHandler = () => {
        setTypeVisible(false);
        setBrandVisible(false);
        setDeviceVisible(false);
    };

    const closeConfirmModalHandler = () => {
        setConfirmVisible(false);
        setCurrentEntity({ type: '', name: '', id: null });
    };

    useEffect(() => {
        fetchDevices(null, null, null, null, true).then((data) => {
            dispatch(deviceActions.setDevices(data.rows));
            dispatch(deviceActions.setTotalCount(data.count));
        });
    }, [dispatch]);

    return (
        <div className="page-container p-0 admin-container">
            <div className="types-table-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={3}>Type Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types?.map((type) =>
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td className="edit-btn">&#8634;</td>
                                <td
                                    className="delete-btn"
                                    data-type="type"
                                    onClick={openConfirmModalHandler(type)}
                                >
                                    &#x2715;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button
                    variant="outline-dark"
                    className="add-btn"
                    onClick={openTypeModalHandler}
                >+</Button>
            </div>
            <div className="brands-table-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={3}>Brand Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands?.map((brand) =>
                            <tr key={brand.id}>
                                <td>{brand.name}</td>
                                <td className="edit-btn">&#8634;</td>
                                <td
                                    className="delete-btn"
                                    data-type="brand"
                                    onClick={openConfirmModalHandler(brand)}
                                >
                                    &#x2715;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button
                    variant="outline-dark"
                    className="add-btn"
                    onClick={openBrandModalHandler}
                >+</Button>
            </div>
            <div className="products-table-container">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices?.map((device) =>
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td className="image-cell p-1">
                                    <Image
                                        width={50}
                                        height={50}
                                        src={process.env.REACT_APP_API_URL + device.img}
                                    />
                                </td>
                                <td>{device.name}</td>
                                <td>{device.price}</td>
                                <td>{device.rating}</td>
                                <td className="edit-btn">&#8634;</td>
                                <td
                                    className="delete-btn"
                                    data-type="device"
                                    onClick={openConfirmModalHandler(device)}
                                >
                                    &#x2715;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button
                    variant="outline-dark"
                    className="add-btn"
                    onClick={openDeviceModalHandler}
                >+</Button>
            </div>

            <CreateTypeModal show={typeVisible} onHide={closeModalHandler} />
            <CreateBrandModal show={brandVisible} onHide={closeModalHandler} />
            <CreateDeviceModal show={deviceVisible} onHide={closeModalHandler} />
            <ConfirmDeleteModal
                show={confirmVisible}
                onHide={closeConfirmModalHandler}
                entity={currentEntity}
            />
        </div>

    );
};

export default Admin;
