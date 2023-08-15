import React from 'react';
import { useSelector } from 'react-redux';
import { getDevices } from '../store/selectors/deviceSelectors';
import Row from 'react-bootstrap/Row';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
    const devices = useSelector(getDevices);

    return (
        <Row className="d-flex device-list-container">
            {devices.map((device) =>
                <DeviceItem key={device.id} device={device} />
            )}
        </Row>
    );
};

export default DeviceList;
