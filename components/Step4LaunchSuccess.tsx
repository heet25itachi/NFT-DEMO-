import React, { useState } from 'react';
import type { NftData } from '../types';
import { LockIcon } from './icons/LockIcon';
import { QuizModal } from './GameModal';
import { PurchaseModal } from './PurchaseModal';
import { DownloadIcon } from './icons/DownloadIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import SellModal from './SellModal';


interface NftDetailProps {
  nftData: NftData;
  onUpdate: (nftData: NftData) => void;
  onBack: () => void;
}

const NftDetailPage: React.FC<NftDetailProps> = ({ nftData, onUpdate, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
    
  const handleConfirmPurchase = () => {
    setShowPurchaseModal(false);
    setIsProcessing(true);
    setTimeout(() => {
        const updatedNft: NftData = {
            ...nftData,
            owner: 'user',
            status: 'owned',
            priceHistory: [
                ...nftData.priceHistory,
                {
                    date: new Date().toISOString(),
                    price: nftData.price!,
                    type: 'sale',
                }
            ]
        };
        onUpdate(updatedNft);
        setIsProcessing(false);
    }, 2000);
  };

  const handleRelist = (newPrice: number) => {
    const updatedNft: NftData = {
        ...nftData,
        price: newPrice,
        status: 'for_sale',
        priceHistory: [
            ...nftData.priceHistory,
            {
                date: new Date().toISOString(),
                price: newPrice,
                type: 'relist',
            }
        ]
    };
    onUpdate(updatedNft);
    setShowSellModal(false);
  };

  const handleDownload = () => {
    if(!nftData.imageUrl) return;
    const link = document.createElement('a');
    link.href = nftData.imageUrl;
    link.download = `${nftData.metadata?.name.replace(/\s+/g, '_') || 'nft'}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isOwnedByUser = nftData.owner === 'user';
  const isForSale = nftData.status === 'for_sale';
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETH' }).format(nftData.price!);

  return (
    <div className="animate-fade-in-up">
        <button onClick={onBack} className="mb-6 text-sm text-brand-secondary hover:underline">
            &larr; Back to Marketplace
        </button>

        {showPurchaseModal && <PurchaseModal onConfirm={handleConfirmPurchase} onCancel={() => setShowPurchaseModal(false)} price={formattedPrice} nftData={nftData} />}
        {showQuizModal && <QuizModal nftData={nftData} onClose={() => setShowQuizModal(false)} />}
        {showSellModal && <SellModal currentPrice={nftData.price!} onList={handleRelist} onCancel={() => setShowSellModal(false)} />}
      
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Image & Details */}
            <div className="lg:w-1/2">
                <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-6">
                    <div className="relative mb-6 group">
                        <img src={nftData.imageUrl!} alt="Launched NFT" className={`rounded-xl w-full transition-all duration-500 ${isOwnedByUser ? '' : 'blur-sm'}`} />
                        {!isOwnedByUser && isForSale && (
                            <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center text-center p-4">
                                <LockIcon className="w-12 h-12 text-white/70 mb-4" />
                                <h4 className="font-bold text-lg text-white">Asset Secured</h4>
                                <p className="text-sm text-gray-300">High-resolution image is available upon purchase.</p>
                            </div>
                        )}
                        {isOwnedByUser && (
                            <button onClick={handleDownload} className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" aria-label="Download Asset">
                                <DownloadIcon className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                    
                    <div className="text-left space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-brand-accent">{nftData.metadata!.name}</h3>
                                <p className="text-sm text-gray-400">Created by {nftData.owner === 'creator' ? 'You' : 'Previous Owner'}</p>
                            </div>
                            <div className="text-right flex-shrink-0 pl-4">
                                <p className="text-sm text-gray-400">{isForSale ? 'Current Price' : 'Last Sale Price'}</p>
                                <p className="text-xl font-bold text-green-400">{formattedPrice}</p>
                            </div>
                        </div>
                        <p className="text-gray-300">{nftData.metadata!.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {nftData.metadata!.attributes.map((attr, index) => (
                            <div key={index} className="p-2 bg-brand-surface rounded-lg text-center">
                                <p className="text-xs uppercase text-brand-secondary font-bold">{attr.trait_type}</p>
                                <p className="font-semibold text-gray-200 text-sm">{attr.value}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Actions & History */}
            <div className="lg:w-1/2">
                <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-6 space-y-6">
                    {/* Action Box */}
                    <div>
                        <h3 className="font-bold text-xl mb-4">Actions</h3>
                        {isOwnedByUser ? (
                            <div className="space-y-3">
                                <button onClick={() => setShowQuizModal(true)} className="w-full px-8 py-3 bg-gradient-to-r from-brand-secondary to-brand-primary hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300">
                                    Start Quest
                                </button>
                                <button onClick={() => setShowSellModal(true)} className="w-full px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full text-lg transition-all duration-300">
                                    Sell Your NFT
                                </button>
                            </div>
                        ) : isForSale ? (
                            <button onClick={() => setShowPurchaseModal(true)} disabled={isProcessing} className="w-full px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold rounded-full text-lg shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-300">
                                {isProcessing ? 'Processing...' : 'Purchase Now'}
                            </button>
                        ) : (
                            <div className="text-center p-4 bg-brand-background/50 rounded-lg">
                                <p className="font-semibold">Not for sale</p>
                                <p className="text-sm text-gray-400">This item is in a private collection.</p>
                            </div>
                        )}
                    </div>

                    {/* Price History */}
                    <div>
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><ChartBarIcon className="w-6 h-6" /> Price History</h3>
                        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {nftData.priceHistory.slice().reverse().map((entry, index) => {
                                const prevPrice = nftData.priceHistory[nftData.priceHistory.length - index - 2]?.price;
                                const priceChange = prevPrice ? entry.price - prevPrice : 0;

                                return(
                                    <li key={index} className="flex justify-between items-center text-sm p-3 bg-brand-background/50 rounded-md">
                                        <div>
                                            <span className="font-semibold capitalize text-brand-accent">{entry.type}</span>
                                            <span className="text-gray-400 ml-2 text-xs">{new Date(entry.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold">Ξ {entry.price.toFixed(4)}</span>
                                            {priceChange !== 0 && (
                                                <span className={`flex items-center justify-end text-xs ml-2 ${priceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {priceChange > 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                                                    Ξ {Math.abs(priceChange).toFixed(4)}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NftDetailPage;