import React from 'react';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/constants';

const Logo = ({ size = 'logo-md' }) => {
    return (
        <NavLink to={SHOP_ROUTE} className={`${size} logo-link`}>
            <span className="logo-text">PERN</span>
        </NavLink>
    );
};

export default Logo;
