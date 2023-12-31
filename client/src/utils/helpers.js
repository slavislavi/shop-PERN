import { useEffect, useState } from "react";

export const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

const throttle = (callback, delay) => {
    let time = Date.now();

    return (...args) => {
        if (time + delay - Date.now() < 0) {
            callback(...args);
            time = Date.now();
        }
    };
};

export const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);

    const updateScrollPosition = throttle(() => {
        setScrollPosition(window.scrollY);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', updateScrollPosition);
        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, [updateScrollPosition]);

    return scrollPosition;
};

export const refineInput = (input) => {
    const currentInput = input.replace(/\s\s+/g, ' ').trim();
    return currentInput;
};

export const priceFormatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});
