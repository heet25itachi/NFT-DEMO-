import React, { useState } from 'react';
import type { User } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface AuthPageProps {
    onLogin: (user: User) => void;
    onSignup: (newUser: Omit<User, 'id' | 'walletBalance'>) => void;
    allUsers: User[];
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup, allUsers }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLoginView) {
            const user = allUsers.find(u => u.username === username && u.password === password);
            if (user) {
                onLogin(user);
            } else {
                setError('Invalid username or password.');
            }
        } else {
            if (allUsers.some(u => u.username === username)) {
                setError('Username is already taken.');
                return;
            }
            if (username.length < 3 || password.length < 4) {
                setError('Username must be at least 3 characters and password at least 4 characters.');
                return;
            }
            onSignup({ username, password });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-background via-indigo-950 to-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <header className="text-center mb-8 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-3">
                        <SparklesIcon className="w-10 h-10 text-brand-primary" />
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-pink to-brand-accent">
                            NFT Launchpad AI
                        </h1>
                    </div>
                </header>

                <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-8">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button onClick={() => setIsLoginView(true)} className={`flex-1 pb-2 text-lg font-semibold transition-colors ${isLoginView ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400'}`}>
                            Login
                        </button>
                        <button onClick={() => setIsLoginView(false)} className={`flex-1 pb-2 text-lg font-semibold transition-colors ${!isLoginView ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400'}`}>
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300"
                                required
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <button type="submit" className="w-full px-8 py-3 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300">
                            {isLoginView ? 'Login' : 'Create Account'}
                        </button>
                    </form>
                    <p className="text-xs text-center text-gray-500 mt-4">New users start with a simulated balance of Ξ 10.00</p>
                </div>
                 <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Gemini. For demonstration purposes only.</p>
                </footer>
            </div>
        </div>
    );
};

export default AuthPage;
