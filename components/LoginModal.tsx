import React, { useState } from 'react';
import { LockIcon } from './icons/LockIcon';

interface LoginModalProps {
    onLoginSuccess: () => void;
    onCancel: () => void;
}

const ADMIN_PASSWORD = 'admin2024'; // Hardcoded for simulation

const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onCancel }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setError('');
            onLoginSuccess();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-brand-primary/20 relative text-center">
                <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl leading-none">&times;</button>
                
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <LockIcon className="w-8 h-8 text-brand-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Admin Access</h3>
                <p className="text-gray-400 mb-6">Enter the password to view the admin panel.</p>

                <div>
                    <input
                        type="password"
                        id="admin-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Password"
                        className="w-full p-3 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300 text-center"
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full mt-6 flex items-center justify-center gap-2 px-8 py-3 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transition-all duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
