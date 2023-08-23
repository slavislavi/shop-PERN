import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../config/routes';
import { getIsAuth, getUser } from '../store/selectors/userSelectors';

const AppRouter = () => {
    const isAuth = useSelector(getIsAuth);
    const user = useSelector(getUser);

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />)}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />)}
            {isAuth && user.role === 'ADMIN' && adminRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />)}
        </Routes>
    );
};

export default AppRouter;
