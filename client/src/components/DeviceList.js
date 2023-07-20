import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../store/selectors/deviceSelectors';
import Row from 'react-bootstrap/Row';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
    const devices = useSelector(getDevices);
    const dispatch = useDispatch();

    return (
        <Row className="d-flex">
            {devices.map((device) =>
                <DeviceItem key={device.id} device={device} />
            )}
        </Row>
    );
};

export default DeviceList;
