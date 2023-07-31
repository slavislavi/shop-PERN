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
        <ListGroup>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={!selectedType.id}
                onClick={selectAllTypes}
            >
                All types
            </ListGroup.Item>
            {types.map((type) =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={type.id === selectedType.id}
                    key={type.id}
                    onClick={selectTypeHandler(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TypeBar;
