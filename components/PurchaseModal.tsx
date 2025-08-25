import React, { useState } from 'react';
import { WalletIcon } from './icons/WalletIcon';
import type { NftData } from '../types';

interface PurchaseModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    price: string;
    nftData: NftData;
}

type ModalStep = 'connect' | 'connecting' | 'confirm';

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ onConfirm, onCancel, price, nftData }) => {
    const [step, setStep] = useState<ModalStep>('connect');

    const handleConnect = () => {
        setStep('connecting');
        setTimeout(() => setStep('confirm'), 1500); // Simulate connection time
    };
    
    const renderContent = () => {
        switch (step) {
            case 'connect':
                return (
                    <>
                        <h3 className="text-2xl font-bold mb-2">Complete Purchase</h3>
                        <p className="text-gray-400 mb-6">To proceed, please connect your wallet.</p>
                        <button onClick={handleConnect} className="w-full flex items-center justify-center gap-3 p-3 bg-brand-primary/80 hover:bg-brand-primary text-white font-bold rounded-lg transition-colors">
                            <WalletIcon className="w-6 h-6" /> Connect Crypto Wallet
                        </button>
                    </>
                );
            case 'connecting':
                return (
                     <div className="text-center p-8">
                        <svg className="animate-spin h-8 w-8 text-brand-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <p className="mt-4 text-gray-300">Connecting to wallet...</p>
                        <p className="text-xs text-gray-500">Please approve the connection in your wallet extension.</p>
                    </div>
                );
            case 'confirm':
                return (
                    <>
                        <h3 className="text-2xl font-bold mb-4">Confirm Transaction</h3>
                        <div className="bg-brand-background/50 rounded-lg p-4 space-y-3 text-left">
                            <div className="flex items-center gap-4">
                                <img src={nftData.imageUrl!} alt={nftData.metadata!.name} className="w-16 h-16 rounded-lg"/>
                                <div>
                                    <p className="text-gray-400 text-sm">You are purchasing</p>
                                    <p className="font-bold text-lg">{nftData.metadata!.name}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                <span className="text-gray-300">Price:</span>
                                <span className="font-bold text-green-400 text-xl">{price}</span>
                            </div>
                        </div>
                        <p className="text-xs text-center text-gray-500 py-4">This is a simulated transaction. No funds will be withdrawn.</p>
                        <button onClick={onConfirm} className="w-full flex items-center justify-center gap-3 p-3 bg-green-600/80 hover:bg-green-600 text-white font-bold rounded-lg transition-colors">
                            Confirm Purchase
                        </button>
                    </>
                );
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-brand-primary/20 relative">
                <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl leading-none">&times;</button>
                {renderContent()}
            </div>
        </div>
    );
};
