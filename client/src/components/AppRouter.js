import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../config/routes';
import { getIsAuth } from '../store/selectors/userSelectors';

const AppRouter = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />)}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />)}
        </Routes>
    );
};

export default AppRouter;
