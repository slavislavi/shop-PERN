import React, { useState } from 'react';

const Checkbox = ({ label, checked, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const onCheckboxChange = () => setIsChecked((prev) => !prev);

    return (
        <div className="checkbox-wrapper mb-5">
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onCheckboxChange}
                    className={isChecked ? "checked" : ""}
                    {...props}
                />
                <span className="checkbox-label">{label}</span>
                <p className="checkbox-text">
                    {isChecked ? "Got it!" : "Your discount is 5%"}
                </p>
            </label>
        </div>
    );
};

export default Checkbox;
