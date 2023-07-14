import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../config/routes';

const AppRouter = () => {
    const isAuth = false;
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