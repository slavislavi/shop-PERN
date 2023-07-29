import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../store/slices/deviceSlice';
import { getLimit } from '../store/selectors/deviceSelectors';

const LimitDropdown = () => {
    const options = [4, 8, 12, 16, 32];
    const limit = useSelector(getLimit);
    const dispatch = useDispatch();

    const onSetSelectedLimit = (opt) => () => dispatch(deviceActions.setLimit(opt));

    return (
        <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
                {limit || "Products on page"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
