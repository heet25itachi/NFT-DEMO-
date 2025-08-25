import React, { useState, useEffect } from 'react';
import { NftData, AppView } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';
import Marketplace from './components/Marketplace';
import CreateNftFlow from './components/CreateNftFlow';
import NftDetailPage from './components/Step4LaunchSuccess';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('marketplace');
  const [allNfts, setAllNfts] = useState<NftData[]>([]);
  const [selectedNftId, setSelectedNftId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedNfts = localStorage.getItem('nftMarketplace');
      if (savedNfts) {
        setAllNfts(JSON.parse(savedNfts));
      }
    } catch (error) {
      console.error("Failed to load NFTs from localStorage", error);
    }
  }, []);

  const updateAndSaveNfts = (newNfts: NftData[]) => {
    setAllNfts(newNfts);
    try {
        localStorage.setItem('nftMarketplace', JSON.stringify(newNfts));
    } catch (error) {
        console.error("Failed to save NFTs to localStorage", error);
    }
  };

  const handleLaunchNft = (newNft: Omit<NftData, 'id'>) => {
    const nftWithId: NftData = {
        ...newNft,
        id: crypto.randomUUID(),
    };
    const updatedNfts = [...allNfts, nftWithId];
    updateAndSaveNfts(updatedNfts);
    setView('marketplace');
  };
  
  const handleSelectNft = (id: string) => {
      setSelectedNftId(id);
      setView('detail');
  };

  const handleUpdateNft = (updatedNft: NftData) => {
      const updatedNfts = allNfts.map(nft => nft.id === updatedNft.id ? updatedNft : nft);
      updateAndSaveNfts(updatedNfts);
  };
  
  const handleBackToMarketplace = () => {
      setView('marketplace');
      setSelectedNftId(null);
  };

  const renderContent = () => {
      switch(view) {
          case 'create':
              return <CreateNftFlow onLaunch={handleLaunchNft} onBack={handleBackToMarketplace} />;
          case 'detail':
              const selectedNft = allNfts.find(nft => nft.id === selectedNftId);
              if (selectedNft) {
                return <NftDetailPage nftData={selectedNft} onUpdate={handleUpdateNft} onBack={handleBackToMarketplace} />;
              }
              // Fallback if no NFT is selected
              setView('marketplace');
              return null;
          case 'marketplace':
          default:
              return <Marketplace nfts={allNfts} onSelectNft={handleSelectNft} onCreateNew={() => setView('create')} />;
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-indigo-950 to-black flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3">
                <SparklesIcon className="w-10 h-10 text-brand-primary" />
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-pink to-brand-accent">
                    NFT Launchpad AI
                </h1>
            </div>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
            Your personal AI assistant to create, launch, and trade unique NFTs in a simulated marketplace.
          </p>
        </header>
        
        <main>
            {renderContent()}
        </main>
      </div>
       <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Gemini. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;