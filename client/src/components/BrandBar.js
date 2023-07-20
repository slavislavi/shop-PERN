import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getSelectedBrand } from '../store/selectors/deviceSelectors';
import { deviceActions } from '../store/slices/deviceSlice';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const BrandBar = () => {
    const brands = useSelector(getBrands);
    const selectedBrand = useSelector(getSelectedBrand);
    const dispatch = useDispatch();

    const selectBrandHandler = (brand) => () => dispatch(deviceActions.setSelectedBrand(brand));

    return (
        <Row className="d-flex">
            {brands.map((brand) =>
                <Card
                    key={brand.id}
                    className="p-3"
                    onClick={selectBrandHandler(brand)}
                    border={brand.id === selectedBrand.id ? "danger" : "light"}
                    style={{ cursor: "pointer", width: "auto" }}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
};

export default BrandBar;
