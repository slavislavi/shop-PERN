import React from 'react';

const Checkbox = ({ label, checked, onCheckedText, notCheckedText, onChange, ...props }) => {
    const defaultChecked = checked ? checked : false;

    return (
        <div className="checkbox-wrapper mb-5">
            <label>
                <input
                    type="checkbox"
                    checked={defaultChecked}
                    onChange={onChange}
                    className={defaultChecked ? "checked" : ""}
                    {...props}
                />
                <span className="checkbox-label">{label}</span>
                <p className="checkbox-text">
                    {defaultChecked ? onCheckedText : notCheckedText}
                </p>
            </label>
        </div>
    );
};

export default Checkbox;
