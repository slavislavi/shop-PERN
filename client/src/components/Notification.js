import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../store/slices/notificationSlice';

const NOTIFICATION_DELAY = 5000;

const Notification = ({ message, variant }) => {
    const [notificationMsg, setNotificationMsg] = useState('');
    const [notificationClass, setNotificationClass] = useState('notification');
    const containerEl = document.getElementById('notification-root');
    const notificationEl = useRef(null);
    const timeout = useRef();

    const dispatch = useDispatch();

    const addVariantClass = () => {
        if (variant === 'success') {
            setNotificationClass('notification mb-2 is-primary');
        }
        if (variant === 'danger') {
            setNotificationClass('notification mb-2 is-danger');
        }
        if (variant === 'warning') {
            setNotificationClass('notification mb-2 is-warning');
        }
    };

    const removeNotification = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        if (notificationEl.current) {
            notificationEl.current.style.opacity = '0';
        }
        setTimeout(() => {
            dispatch(notificationActions.setNotification({ message: '', variant: '' }));
        }, 300);
    };

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            if (notificationEl.current) {
                notificationEl.current.style.opacity = '0';
            }
            setTimeout(() => {
                setNotificationMsg(message);
                addVariantClass();
                setTimeout(() => {
                    if (notificationEl.current) {
                        notificationEl.current.style.opacity = '1';
                        timeout.current = setTimeout(() => {
                            removeNotification();
                        }, NOTIFICATION_DELAY);
                    }
                }, 20);
            }, 300);
        } else {
            setNotificationMsg(message);
            addVariantClass();
            setTimeout(() => {
                if (notificationEl.current) {
                    notificationEl.current.style.opacity = '1';
                    timeout.current = setTimeout(() => {
                        removeNotification();
                    }, NOTIFICATION_DELAY);
                }
            }, 20);
        }
    }, [message]);

    const output = (
        <div className={notificationClass} ref={notificationEl}>
            <button className="delete" onClick={removeNotification}></button>
            <div>{notificationMsg}</div>
        </div>
    );

    return containerEl ? createPortal(output, containerEl) : null;
};

export default Notification;
