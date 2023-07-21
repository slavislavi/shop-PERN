import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userApi';
import { userActions } from './store/slices/userSlice';
import { Spinner } from 'react-bootstrap';

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        check().then((data) => {
            dispatch(userActions.setUser(data));
            dispatch(userActions.setIsAuth(true));
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
