"use client"
import React, { useState, useEffect } from 'react';

const ScrollToTopTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > document.documentElement.scrollHeight / 10) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-10 right-10 z-50">
                    <button
                        onClick={scrollToTop}
                        className="w-8 h-8 animate-bounce flex justify-center items-center bg-purple-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
                    >
                        ↑
                    </button>
                </div>
            )}
        </>
    );
};

export default ScrollToTopTop;
