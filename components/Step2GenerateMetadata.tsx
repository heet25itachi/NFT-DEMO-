
import React, { useState } from 'react';
import type { NftData, NftMetadata } from '../types';
import { generateMetadata } from '../services/geminiService';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface Step2Props {
  nftData: Omit<NftData, 'id'>;
  setNftData: React.Dispatch<React.SetStateAction<Omit<NftData, 'id'>>>;
  nextStep: () => void;
  setError: (error: string | null) => void;
}

const Step2GenerateMetadata: React.FC<Step2Props> = ({ nftData, setNftData, nextStep, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!nftData.prompt) {
      setError('Missing image prompt. Please go back to the first step.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const metadata = await generateMetadata(nftData.prompt);
      setNftData(prev => ({ ...prev, metadata }));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating metadata.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!nftData.imageUrl) {
    return <div className="text-center text-gray-400">Please generate an image first.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in-up items-start">
      <div className="lg:w-1/2 w-full flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Your NFT Art</h2>
          <img src={nftData.imageUrl} alt="Generated NFT" className="rounded-xl shadow-2xl w-full animate-pulse-glow" />
      </div>

      <div className="lg:w-1/2 w-full">
        <h2 className="text-xl font-bold mb-2">2. Create NFT Details</h2>
        <p className="text-sm text-gray-400 mb-6">
          Let our AI generate a compelling name, description, and attributes for your new NFT based on your original idea.
        </p>
        
        {!nftData.metadata && (
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-brand-primary hover:bg-purple-600 disabled:bg-gray-500 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Details...
              </>
            ) : (
              'Generate NFT Details'
            )}
          </button>
        )}

        {nftData.metadata && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="p-4 bg-brand-background/50 rounded-lg border border-white/10">
                <label className="text-sm text-gray-400">Name</label>
                <p className="text-xl font-semibold text-brand-accent">{nftData.metadata.name}</p>
            </div>
            <div className="p-4 bg-brand-background/50 rounded-lg border border-white/10">
                <label className="text-sm text-gray-400">Description</label>
                <p className="text-gray-200">{nftData.metadata.description}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {nftData.metadata.attributes.map((attr, index) => (
                    <div key={index} className="p-3 bg-brand-background/50 rounded-lg border border-white/10 text-center">
                        <p className="text-xs uppercase text-brand-secondary font-bold">{attr.trait_type}</p>
                        <p className="font-semibold text-gray-200">{attr.value}</p>
                    </div>
                    ))}
                </div>
            </div>
            <button
                onClick={nextStep}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-pink to-orange-500 hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-pink/30 transform hover:scale-105 transition-all duration-300"
            >
                Next: Set Price <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2GenerateMetadata;