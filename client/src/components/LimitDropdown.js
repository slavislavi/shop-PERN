import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deviceActions } from '../store/slices/deviceSlice';

const LimitDropdown = () => {
    const options = [4, 8, 12, 16, 32];
    const dispatch = useDispatch();

    const onSetSelectedLimit = (opt) => () => dispatch(deviceActions.setLimit(opt));

    return (
        <Dropdown
            className="mt-4"
            as={ButtonGroup}
            data-bs-theme="dark"
        >
            <Button variant="dark">Products on page</Button>
            <Dropdown.Toggle split variant="dark" />
            <Dropdown.Menu style={{ minWidth: 0 }}>
                {options.map((opt) =>
                    <Dropdown.Item
                        key={opt}
                        onClick={onSetSelectedLimit(opt)}
                    >
                        {opt}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LimitDropdown;
