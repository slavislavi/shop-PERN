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

    const selectAllBrands = () => dispatch(deviceActions.setSelectedBrand({}));

    return (
        <Row className="d-flex">
            <Card
                className="brand-card all-brands-btn"
                onClick={selectAllBrands}
                border={!selectedBrand.id ? "dark" : "light"}
            >
                All brands
            </Card>
            {brands.map((brand) =>
                <Card
                    key={brand.id}
                    className="brand-card"
                    onClick={selectBrandHandler(brand)}
                    border={brand.id === selectedBrand.id ? "dark" : "light"}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
};

export default BrandBar;
