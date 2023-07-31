import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { getSelectedType, getTypes } from '../store/selectors/deviceSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../store/slices/deviceSlice';

const TypeBar = () => {
    const types = useSelector(getTypes);
    const selectedType = useSelector(getSelectedType);
    const dispatch = useDispatch();

    const selectTypeHandler = (type) => () => dispatch(deviceActions.setSelectedType(type));
    const selectAllTypes = () => dispatch(deviceActions.setSelectedType({}));

    return (
        <ListGroup data-bs-theme="dark">
            <ListGroup.Item
                active={!selectedType.id}
                onClick={selectAllTypes}
                variant="dark"
                className="all-types-btn"
            >
                All types
            </ListGroup.Item>
            {types.map((type) =>
                <ListGroup.Item
                    active={type.id === selectedType.id}
                    key={type.id}
                    onClick={selectTypeHandler(type)}
                    variant="dark"
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TypeBar;
