import React from 'react';
import type { User, AppView } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface AppHeaderProps {
    currentUser: User;
    onLogout: () => void;
    onNavigate: (view: AppView) => void;
    onAdminLogin: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ currentUser, onLogout, onNavigate, onAdminLogin }) => {
    return (
        <header className="flex flex-wrap items-center justify-between gap-4 animate-fade-in-up pb-6 border-b border-white/10">
            <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onNavigate('marketplace')}
            >
                <SparklesIcon className="w-9 h-9 text-brand-primary" />
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-pink to-brand-accent">
                    NFT Launchpad AI
                </h1>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-semibold">{currentUser.username}</p>
                    <p className="text-sm font-mono text-green-400">Ξ {currentUser.walletBalance.toFixed(4)}</p>
                </div>
                <button
                    onClick={() => onNavigate('profile')}
                    className="px-4 py-2 bg-brand-surface hover:bg-gray-700 border border-white/10 text-white font-semibold rounded-full text-sm transition-colors"
                >
                    Profile
                </button>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-brand-pink/20 hover:bg-brand-pink/40 border border-brand-pink text-brand-pink font-semibold rounded-full text-sm transition-colors"
                >
                    Logout
                </button>
            </div>
             <footer className="w-full text-center mt-4 text-gray-500 text-xs">
                <p>Powered by Gemini. For demonstration purposes only. <button onClick={onAdminLogin} className="ml-2 hover:text-gray-400 hover:underline">Admin Login</button></p>
            </footer>
        </header>
    );
};

export default AppHeader;
