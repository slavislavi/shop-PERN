import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import CreateTypeModal from '../components/modals/CreateTypeModal';
import CreateBrandModal from '../components/modals/CreateBrandModal';
import CreateDeviceModal from '../components/modals/CreateDeviceModal';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const openTypeModalHandler = () => setTypeVisible(true);
    const openBrandModalHandler = () => setBrandVisible(true);
    const openDeviceModalHandler = () => setDeviceVisible(true);

    const closeTypeModalHandler = () => setTypeVisible(false);
    const closeBrandModalHandler = () => setBrandVisible(false);
    const closeDeviceModalHandler = () => setDeviceVisible(false);

    return (
        <div className="page-container p-0 admin-container">
            <div className="types-table-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Type Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mobile phone</td>
                        </tr>
                        <tr>
                            <td>Laptop</td>
                        </tr>
                        <tr>
                            <td>Coffee machine</td>
                        </tr>
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
                            <th>Brand Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Samsung</td>
                        </tr>
                        <tr>
                            <td>Apple</td>
                        </tr>
                        <tr>
                            <td>Lenovo</td>
                        </tr>
                    </tbody>
                </Table>
                <Button
                    variant="outline-dark"
                    className="add-btn"
                    onClick={openBrandModalHandler}
                >+</Button>
            </div>
            <div className="products-table-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>url img</td>
                            <td>iPhone 14 pro silver</td>
                            <td>1800</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>url img</td>
                            <td>Macbook Pro M2 max grey</td>
                            <td>3250</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>url img</td>
                            <td>Delonghi Coffee Chamber DS-5411</td>
                            <td>2715</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>url img</td>
                            <td>iPhone 14 pro silver</td>
                            <td>1800</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>url img</td>
                            <td>Macbook Pro M2 max grey</td>
                            <td>3250</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>url img</td>
                            <td>Delonghi Coffee Chamber DS-5411</td>
                            <td>2715</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </Table>
                <Button
                    variant="outline-dark"
                    className="add-btn"
                    onClick={openDeviceModalHandler}
                >+</Button>
            </div>

            <CreateTypeModal show={typeVisible} onHide={closeTypeModalHandler} />
            <CreateBrandModal show={brandVisible} onHide={closeBrandModalHandler} />
            <CreateDeviceModal show={deviceVisible} onHide={closeDeviceModalHandler} />
        </div>

    );
};

export default Admin;
