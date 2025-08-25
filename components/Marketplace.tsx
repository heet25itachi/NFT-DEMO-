import React from 'react';
import type { NftData } from '../types';
import NftCard from './NftCard';

interface MarketplaceProps {
    nfts: NftData[];
    onSelectNft: (id: string) => void;
    onCreateNew: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ nfts, onSelectNft, onCreateNew }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-8">
                <button 
                    onClick={onCreateNew}
                    className="px-8 py-4 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300"
                >
                    + Create New NFT
                </button>
            </div>
            
            {nfts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {nfts.map(nft => (
                        <NftCard key={nft.id} nft={nft} onSelect={() => onSelectNft(nft.id)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-6 bg-brand-surface/50 rounded-2xl border border-dashed border-gray-600">
                    <h2 className="text-2xl font-bold text-white">Your Marketplace is Empty</h2>
                    <p className="text-gray-400 mt-2">Click the button above to create your first AI-generated NFT and list it for sale!</p>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
