'use client'
import React, { useEffect, useState } from 'react';

const themes = ["light", "acid", "cmyk", "business", "dracula", "dark"];

const ThemeController = () => {
    const [theme, setTheme] = useState('default');

    useEffect(() => {
        // Load the theme from localStorage if it exists
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                {
                    themes.map((themeOption) => (
                        <li key={themeOption}>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label={themeOption}
                                value={themeOption}
                                checked={theme === 'default'}
                                onChange={handleThemeChange}
                                style={{width:'100%'}}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ThemeController;
