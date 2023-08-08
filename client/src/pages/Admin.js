import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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
                            <th colSpan={3}>Type Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mobile phone</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>Laptop</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>Coffee machine</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
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
                            <th colSpan={3}>Brand Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Samsung</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>Apple</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>Lenovo</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
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
                            <th>ID</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>19</td>
                            <td>url img</td>
                            <td>iPhone 14 pro silver</td>
                            <td>1800</td>
                            <td>4</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>157</td>
                            <td>url img</td>
                            <td>Macbook Pro M2 max grey</td>
                            <td>3250</td>
                            <td>5</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>135</td>
                            <td>url img</td>
                            <td>Delonghi Coffee Chamber DS-5411</td>
                            <td>2715</td>
                            <td>4</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>315</td>
                            <td>url img</td>
                            <td>iPhone 14 pro silver</td>
                            <td>1800</td>
                            <td>4</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>85</td>
                            <td>url img</td>
                            <td>Macbook Pro M2 max grey</td>
                            <td>3250</td>
                            <td>5</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td>url img</td>
                            <td>Delonghi Coffee Chamber DS-5411</td>
                            <td>2715</td>
                            <td>4</td>
                            <td className="edit-btn">&#8634;</td>
                            <td className="delete-btn">&#x2715;</td>
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
