import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { getNotification } from './store/selectors/notificationSelectors';
import { check } from './http/userApi';
import { userActions } from './store/slices/userSlice';
import { Spinner } from 'react-bootstrap';
import { getBasketItems } from './store/selectors/deviceSelectors';
import { getBasket } from './http/deviceApi';
import { deviceActions } from './store/slices/deviceSlice';

const App = () => {
    const [loading, setLoading] = useState(true);
    const { message, variant } = useSelector(getNotification);
    const orders = useSelector(getBasketItems);
    const dispatch = useDispatch();

    useEffect(() => {
        check().then((data) => {
            if (data) {
                dispatch(userActions.setUser(data));
                dispatch(userActions.setIsAuth(true));
            }
        }).finally(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        getBasket()
            .then((data) => dispatch(deviceActions.setBasketItems(data)));
    }, [dispatch]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="grow" />
            </div>
        );
    }

    return (
        <>
            <NavBar basketItems={orders} />
            <AppRouter />
            <Footer />
            {message && <Notification message={message} variant={variant} />}
        </>
    );
};

export default App;
