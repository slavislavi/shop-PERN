import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../store/selectors/deviceSelectors';
import Row from 'react-bootstrap/Row';

const DeviceList = () => {
    const devices = useSelector(getDevices);
    const dispatch = useDispatch();

    return (
        <Row className="d-flex">
            {devices.map((device) =>
                <div>

                </div>
            )}
        </Row>
    );
};

export default DeviceList;
