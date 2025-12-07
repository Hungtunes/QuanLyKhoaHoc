
import React from 'react';
import type { View } from '../../types';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
    const title = currentView.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
