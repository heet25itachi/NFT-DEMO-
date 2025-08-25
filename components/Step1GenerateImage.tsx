
import React, { useState } from 'react';
import type { NftData } from '../types';
import { generateImage } from '../services/geminiService';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface Step1Props {
  setNftData: React.Dispatch<React.SetStateAction<Omit<NftData, 'id' | 'ownerId' | 'creatorId'>>>;
  nextStep: () => void;
  setError: (error: string | null) => void;
}

const Step1GenerateImage: React.FC<Step1Props> = ({ setNftData, nextStep, setError }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
    
  const examplePrompts = [
    "A cyberpunk wizard casting a spell in a neon-lit alley",
    "A majestic lion wearing a crown made of stars",
    "A serene, floating island with a crystal waterfall",
    "An abstract explosion of colors representing joy"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your NFT art.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImageUrl(imageUrl);
      setNftData(prev => ({ ...prev, prompt, imageUrl }));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the image.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <label htmlFor="prompt" className="block text-lg font-semibold text-gray-200 mb-2">
          1. Describe Your NFT Art
        </label>
        <p className="text-sm text-gray-400 mb-4">
          Enter a detailed description of the image you want to create. Be as creative as you like!
        </p>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A stoic astronaut meditating on a psychedelic planet"
          className="w-full h-28 p-3 bg-brand-background/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-300 resize-none"
          disabled={isLoading}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {examplePrompts.map(p => (
            <button key={p} onClick={() => handleSelectExample(p)} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-full transition-colors">
              {p.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-brand-primary hover:bg-purple-600 disabled:bg-gray-500 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-primary/30 transform hover:scale-105 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
             <> <SparklesIcon className="w-6 h-6" /> Create My Art </>
          )}
        </button>
      </div>
      
      {generatedImageUrl && (
         <div className="text-center animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">Your Generated NFT Art</h3>
            <div className="relative w-full max-w-sm mx-auto group">
              <img src={generatedImageUrl} alt="Generated NFT" className="rounded-xl shadow-2xl animate-pulse-glow" />
            </div>
            <button
                onClick={nextStep}
                className="mt-8 w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-pink to-orange-500 hover:opacity-90 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-pink/30 transform hover:scale-105 transition-all duration-300"
            >
                Next: Describe NFT <ChevronRightIcon className="w-5 h-5" />
            </button>
         </div>
      )}
    </div>
  );
};

export default Step1GenerateImage;