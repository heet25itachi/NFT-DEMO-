import React, { useEffect, useState } from 'react';
import type { NftData } from '../types';
import { LockIcon } from './icons/LockIcon';
import { QuizModal } from './GameModal';
import { PurchaseModal } from './PurchaseModal';
import { DownloadIcon } from './icons/DownloadIcon';

interface Step4Props {
  nftData: NftData;
  onRestart: () => void;
}

const Step4LaunchSuccess: React.FC<Step4Props> = ({ nftData, onRestart }) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
    
  useEffect(() => {
    const confettiCount = 100;
    const parent = document.querySelector('.confetti-container');
    if(!parent) return;
    
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      parent.appendChild(confetti);
    }
    
    const styleId = 'confetti-styles';
    if(document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        .confetti-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: 10; }
        .confetti-piece { position: absolute; width: 10px; height: 10px; opacity: 0; animation: drop linear infinite; }
        @keyframes drop {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

  }, []);

  const handleConfirmPurchase = () => {
    setShowPurchaseModal(false);
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setIsPurchased(true);
    }, 2000); // Simulate processing time
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

  if (!nftData.imageUrl || !nftData.metadata || !nftData.price || !nftData.transactionId) {
    return (
      <div className="text-center">
        <p className="text-red-400">NFT data is missing. Please start over.</p>
        <button
          onClick={onRestart}
          className="mt-6 px-6 py-2 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETH' }).format(nftData.price);


  return (
    <div className="text-center animate-fade-in-up relative">
      <div className="confetti-container"></div>
      
      {showPurchaseModal && <PurchaseModal onConfirm={handleConfirmPurchase} onCancel={() => setShowPurchaseModal(false)} price={formattedPrice} nftData={nftData} />}
      {showQuizModal && <QuizModal nftData={nftData} onClose={() => setShowQuizModal(false)} />}
      
      <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
        {isPurchased ? "Purchase Successful!" : "Congratulations! Your NFT is Listed!"}
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        {isPurchased ? "This NFT is now in your collection. You can download the asset or start the quest to prove your worth." : "Your unique, AI-generated NFT is now conceptually on the blockchain. Below is the public listing page."}
      </p>

      <div className="max-w-lg mx-auto bg-brand-background/30 rounded-2xl shadow-2xl p-6 border border-white/10">
        <div className="relative mb-6 group">
            <img src={nftData.imageUrl} alt="Launched NFT" className={`rounded-xl w-full transition-all duration-500 ${isPurchased ? '' : 'blur-sm'}`} />
            {!isPurchased && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center text-center p-4">
                    <LockIcon className="w-12 h-12 text-white/70 mb-4" />
                    <h4 className="font-bold text-lg text-white">Asset Secured</h4>
                    <p className="text-sm text-gray-300">High-resolution image is available upon purchase.</p>
                </div>
            )}
            {isPurchased && (
                <button onClick={handleDownload} className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" aria-label="Download Asset">
                    <DownloadIcon className="w-6 h-6" />
                </button>
            )}
        </div>
        
        <div className="text-left space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-brand-accent">{nftData.metadata.name}</h3>
                    <p className="text-sm text-gray-400">Created by You</p>
                </div>
                <div className="text-right flex-shrink-0 pl-4">
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-xl font-bold text-green-400">{formattedPrice}</p>
                </div>
            </div>
            <p className="text-gray-300">{nftData.metadata.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
                {nftData.metadata.attributes.map((attr, index) => (
                <div key={index} className="p-2 bg-brand-surface rounded-lg text-center">
                    <p className="text-xs uppercase text-brand-secondary font-bold">{attr.trait_type}</p>
                    <p className="font-semibold text-gray-200 text-sm">{attr.value}</p>
                </div>
                ))}
            </div>
            
            {isPurchased ? (
                 <button onClick={() => setShowQuizModal(true)} className="w-full mt-4 px-8 py-3 bg-gradient-to-r from-brand-secondary to-brand-primary hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300">
                    Start Quest
                </button>
            ) : (
                <button onClick={() => setShowPurchaseModal(true)} disabled={isProcessing} className="w-full mt-4 px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold rounded-full text-lg shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-300">
                    {isProcessing ? 'Processing...' : 'Purchase Now'}
                </button>
            )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-left">
            <h4 className="font-bold text-lg text-white mb-3">Transaction Details</h4>
            <div className="text-sm space-y-2 text-gray-400 break-words">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-200">Payment Status:</span>
                    <span className={`font-bold ${isPurchased ? 'text-green-400' : 'text-yellow-400'}`}>
                        {isPurchased ? 'Complete' : 'Awaiting Customer'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-200">Block ID:</span>
                    <span className="font-mono text-brand-accent/80">{nftData.transactionId}</span>
                </div>
                 <p className="text-xs text-center pt-2">This is a simulated receipt. No real transaction has occurred.</p>
            </div>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="mt-10 px-8 py-3 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300"
      >
        Create Another NFT
      </button>
    </div>
  );
};

export default Step4LaunchSuccess;