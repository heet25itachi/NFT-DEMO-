import React, { useState } from 'react';

interface SellModalProps {
    currentPrice: number;
    onList: (newPrice: number) => void;
    onCancel: () => void;
}

const SellModal: React.FC<SellModalProps> = ({ currentPrice, onList, onCancel }) => {
    const [price, setPrice] = useState(currentPrice.toString());
    const [error, setError] = useState('');

    const handleList = () => {
        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            setError('Please enter a valid price greater than zero.');
            return;
        }
        setError('');
        onList(priceValue);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-brand-primary/20 relative text-center">
                <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl leading-none">&times;</button>
                
                <h3 className="text-2xl font-bold mb-2">Sell Your NFT</h3>
                <p className="text-gray-400 mb-6">Set a new price to list this item on the marketplace.</p>

                <div>
                    <label htmlFor="sell-price" className="block text-lg font-semibold text-gray-200 mb-2">
                        New Listing Price (ETH)
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-400 sm:text-sm">Ξ</span>
                        </div>
                        <input
                            type="number"
                            id="sell-price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 pl-7 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <button
                    onClick={handleList}
                    className="w-full mt-6 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-pink to-orange-500 hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-pink/30 transform hover:scale-105 transition-all duration-300"
                >
                    List for Sale
                </button>
            </div>
        </div>
    );
};

export default SellModal;
