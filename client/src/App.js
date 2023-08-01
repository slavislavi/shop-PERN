import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { check } from './http/userApi';
import { userActions } from './store/slices/userSlice';
import { Spinner } from 'react-bootstrap';
import './styles/index.css';

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        check().then((data) => {
            dispatch(userActions.setUser(data));
            dispatch(userActions.setIsAuth(true));
        }).finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return <Spinner animation="grow" className="justify-content-center" />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
};

export default App;
