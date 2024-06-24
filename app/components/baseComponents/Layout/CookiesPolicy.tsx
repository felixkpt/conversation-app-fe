'use client'
import React, { useState, useEffect } from 'react';

type Props = {}

const CookiesPolicy = (props: Props) => {
    const [acceptedCookies, setAcceptedCookies] = useState<boolean | null>(null);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (cookiesAccepted !== null) {
            setAcceptedCookies(cookiesAccepted === 'true');
        }
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setAcceptedCookies(true);
    };

    const handleDenyCookies = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setAcceptedCookies(false);
    };

    // If user has already accepted cookies, do not show the component
    if (acceptedCookies !== null && acceptedCookies === true) {
        return null;
    }

    return (
        <div role="alert" className="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>We use cookies for no reason.</span>
            <div>
                <button className="btn btn-sm" onClick={handleDenyCookies}>Deny</button>
                <button className="btn btn-sm btn-primary" onClick={handleAcceptCookies}>Accept</button>
            </div>
        </div>
    );
}

export default CookiesPolicy;
