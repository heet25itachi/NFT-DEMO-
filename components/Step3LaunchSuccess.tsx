
import React, { useEffect } from 'react';
import type { NftData } from '../types';

interface Step3Props {
  nftData: NftData;
  onRestart: () => void;
}

const Step3LaunchSuccess: React.FC<Step3Props> = ({ nftData, onRestart }) => {
    
  useEffect(() => {
    // A simple confetti effect
    const confettiCount = 100;
    const parent = document.querySelector('.confetti-container');
    if(!parent) return;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      parent.appendChild(confetti);
    }
    
    // Add a temporary style for confetti
    const style = document.createElement('style');
    style.innerHTML = `
        .confetti-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
        .confetti-piece { position: absolute; width: 10px; height: 10px; opacity: 0; animation: drop linear infinite; }
        @keyframes drop {
            0% { transform: translateY(-10vh); opacity: 1; }
            100% { transform: translateY(110vh); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };

  }, []);

  if (!nftData.imageUrl || !nftData.metadata) {
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

  return (
    <div className="text-center animate-fade-in-up relative">
      <div className="confetti-container"></div>
      <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
        Congratulations! Your NFT is Launched!
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        Your unique, AI-generated NFT is now conceptually on the blockchain. Share your creation with the world!
      </p>

      <div className="max-w-md mx-auto bg-brand-background/30 rounded-2xl shadow-2xl p-6 border border-white/10">
        <img src={nftData.imageUrl} alt="Launched NFT" className="rounded-xl w-full mb-6" />
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-brand-accent">{nftData.metadata.name}</h3>
            <p className="text-gray-300">{nftData.metadata.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
                {nftData.metadata.attributes.map((attr, index) => (
                <div key={index} className="p-2 bg-brand-surface rounded-lg text-center">
                    <p className="text-xs uppercase text-brand-secondary font-bold">{attr.trait_type}</p>
                    <p className="font-semibold text-gray-200 text-sm">{attr.value}</p>
                </div>
                ))}
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

export default Step3LaunchSuccess;
