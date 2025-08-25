
import React, { useState } from 'react';
import type { NftData } from '../types';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface Step3Props {
  nftData: NftData;
  setNftData: React.Dispatch<React.SetStateAction<NftData>>;
  nextStep: () => void;
  setError: (error: string | null) => void;
}

const Step3SetPrice: React.FC<Step3Props> = ({ nftData, setNftData, nextStep, setError }) => {
  const [price, setPrice] = useState('');

  const handleLaunch = () => {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price greater than zero.');
      return;
    }
    setError(null);
    
    // Simulate a cryptographic transaction ID
    const randomBytes = new Uint8Array(20);
    crypto.getRandomValues(randomBytes);
    const transactionId = '0x' + Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');

    setNftData(prev => ({ ...prev, price: priceValue, transactionId }));
    nextStep();
  };

  if (!nftData.imageUrl || !nftData.metadata) {
    return <div className="text-center text-gray-400">Please generate image and metadata first.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in-up items-start">
      <div className="lg:w-1/2 w-full flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Review Your Creation</h2>
          <img src={nftData.imageUrl} alt="Generated NFT" className="rounded-xl shadow-2xl w-full animate-pulse-glow" />
      </div>

      <div className="lg:w-1/2 w-full">
        <h2 className="text-xl font-bold mb-2">3. Set Your Price</h2>
        <p className="text-sm text-gray-400 mb-6">
          Determine the value of your NFT. This price will be publicly visible on the listing. We'll use ETH as the currency for this simulation.
        </p>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="price" className="block text-lg font-semibold text-gray-200 mb-2">
              Listing Price (ETH)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-400 sm:text-sm">Ξ</span>
              </div>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.05"
                className="w-full p-3 pl-7 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <button
            onClick={handleLaunch}
            className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-pink to-orange-500 hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-pink/30 transform hover:scale-105 transition-all duration-300"
          >
            Launch My NFT! <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3SetPrice;
