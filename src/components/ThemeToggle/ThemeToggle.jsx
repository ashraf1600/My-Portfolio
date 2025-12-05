import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700/70 border border-gray-300 dark:border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 group"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-500 transition-transform duration-300 group-hover:rotate-180" />
            ) : (
                <FiMoon className="w-5 h-5 text-purple-600 transition-transform duration-300 group-hover:-rotate-12" />
            )}
        </button>
    );
};

export default ThemeToggle;
