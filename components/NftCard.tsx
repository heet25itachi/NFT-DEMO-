import React from 'react';
import type { NftData } from '../types';

interface NftCardProps {
    nft: NftData;
    onSelect: () => void;
}

const NftCard: React.FC<NftCardProps> = ({ nft, onSelect }) => {
    const formattedPrice = nft.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETH' }).format(nft.price) : 'N/A';
    
    return (
        <div 
            className="bg-brand-surface/80 rounded-2xl shadow-lg border border-white/10 overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300"
            onClick={onSelect}
        >
            <div className="relative">
                <img 
                    src={nft.imageUrl!} 
                    alt={nft.metadata?.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                 {nft.status === 'for_sale' && (
                    <span className="absolute top-3 right-3 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        For Sale
                    </span>
                )}
                 {nft.status === 'owned' && (
                    <span className="absolute top-3 right-3 bg-brand-primary/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        In Collection
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-white">{nft.metadata?.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="font-semibold text-brand-accent">{formattedPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
