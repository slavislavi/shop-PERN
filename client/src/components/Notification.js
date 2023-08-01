import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Logo from './Logo';

function Notification({ title, time, message, onClose, show, variant }) {
    return (
        <ToastContainer className="position-static" position="bottom-start">
            <Toast onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Header>
                    <Logo size="logo-sm" />
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted">{time}</small>
                </Toast.Header>
                <Toast.Body variant={variant}>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Notification;
