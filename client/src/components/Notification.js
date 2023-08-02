import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../store/slices/notificationSlice';

const NOTIFICATION_DELAY = 5000;
const TRANSITION_DELAY = 200;

const Notification = ({ message, variant }) => {
    const notificationEl = useRef(null);
    const timeout = useRef();
    const dispatch = useDispatch();

    const removeNotification = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        if (notificationEl.current) {
            notificationEl.current.style.opacity = '0';
            notificationEl.current.style.left = '-400px';
        }
        setTimeout(() => {
            dispatch(notificationActions.setNotification({ message: '', variant: '' }));
        }, TRANSITION_DELAY);
    };

    useEffect(() => {
        setTimeout(() => {
            if (notificationEl.current) {
                notificationEl.current.style.opacity = '0.8';
                notificationEl.current.style.left = 0;
                timeout.current = setTimeout(() => {
                    removeNotification();
                }, NOTIFICATION_DELAY);
            }
        }, 20);
        return () => removeNotification();
    }, [message]);

    const output = (
        <div className="notification-container">
            <div className={`notification ${variant}`} ref={notificationEl}>
                <div className="notification-text">{message}</div>
                <button className="notification-delete" onClick={removeNotification}>&#x2715;</button>
            </div>
        </div>
    );

    return createPortal(output, document.getElementById('root'));
};

export default Notification;
