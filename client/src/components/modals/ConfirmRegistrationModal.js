import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const ConfirmRegistrationModal = ({ handleClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    const hideModal = () => setIsVisible(false);

    return (
        <div className="email-tooltip-container">
            {isVisible && (
                <Container className="pt-2 pb-2 mb-3 d-flex justify-content-between align-items-center">
                    <div>We sent an activation link to your email</div>
                    <Button
                        onClick={hideModal}
                    />
                </Container>
            )}
        </div>
    );
};

export default ConfirmRegistrationModal;
