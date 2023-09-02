import React from 'react';
import Rating from '@mui/material/Rating';

const RatingStars = ({ onRatingChange, ratingValue, isAuth, canRate }) => {

    return (
        <>
            {isAuth && canRate && (
                <>
                    <Rating
                        name="simple-controlled"
                        onChange={(event, newValue) => {
                            onRatingChange(newValue);
                        }}
                        precision={1}
                        size="large"
                    />
                    <p>Please, rate the device</p>
                </>
            )}

            {!isAuth && canRate && (
                <>
                    <Rating name="read-only" value={ratingValue} readOnly size="large" />
                    <p>Log in to rate the device</p>
                </>
            )}
            {isAuth && !canRate && (
                <>
                    <Rating name="read-only" value={ratingValue} readOnly size="large" />
                    <p>Thank you for rating</p>
                </>
            )}
        </>
    );
};

export default RatingStars;
