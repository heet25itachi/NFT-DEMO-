import React, { useState, useEffect } from 'react';
import { NftData, AppView, User } from './types';
import Marketplace from './components/Marketplace';
import CreateNftFlow from './components/CreateNftFlow';
import NftDetailPage from './components/NftDetailPage';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import AuthPage from './components/AuthPage';
import AppHeader from './components/AppHeader';
import ProfilePage from './components/ProfilePage';

const PLATFORM_USER_ID = 'platform_admin';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('marketplace');
  const [allNfts, setAllNfts] = useState<NftData[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedNftId, setSelectedNftId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    try {
      const savedNfts = localStorage.getItem('nftMarketplaceNfts');
      if (savedNfts) setAllNfts(JSON.parse(savedNfts));
      
      const savedUsers = localStorage.getItem('nftMarketplaceUsers');
      if (savedUsers) {
        setAllUsers(JSON.parse(savedUsers));
      } else {
        // Create the platform user if no users exist
        const platformUser: User = { id: PLATFORM_USER_ID, username: 'Platform', password: '', walletBalance: 0 };
        setAllUsers([platformUser]);
      }

      const savedCurrentUser = localStorage.getItem('nftMarketplaceCurrentUser');
      if (savedCurrentUser) {
        setCurrentUser(JSON.parse(savedCurrentUser));
      }

    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  const updateAndSaveNfts = (newNfts: NftData[]) => {
    setAllNfts(newNfts);
    localStorage.setItem('nftMarketplaceNfts', JSON.stringify(newNfts));
  };

  const updateAndSaveUsers = (newUsers: User[]) => {
    setAllUsers(newUsers);
    localStorage.setItem('nftMarketplaceUsers', JSON.stringify(newUsers));
    // Also update the currentUser state if they are in the updated list
    if (currentUser) {
        const updatedCurrentUser = newUsers.find(u => u.id === currentUser.id);
        if (updatedCurrentUser) {
            setCurrentUser(updatedCurrentUser);
            localStorage.setItem('nftMarketplaceCurrentUser', JSON.stringify(updatedCurrentUser));
        }
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('nftMarketplaceCurrentUser', JSON.stringify(user));
    setView('marketplace');
  };

  const handleSignup = (newUser: Omit<User, 'id' | 'walletBalance'>) => {
    const userWithId: User = { ...newUser, id: crypto.randomUUID(), walletBalance: 10 }; // Start with 10 ETH
    const updatedUsers = [...allUsers, userWithId];
    updateAndSaveUsers(updatedUsers);
    handleLogin(userWithId);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nftMarketplaceCurrentUser');
    setView('marketplace'); // Will be redirected to AuthPage by render logic
  };

  const handleLaunchNft = (newNft: Omit<NftData, 'id'>) => {
    const nftWithId: NftData = {
        ...newNft,
        id: crypto.randomUUID(),
    };
    updateAndSaveNfts([...allNfts, nftWithId]);
    setView('marketplace');
  };
  
  const handleSelectNft = (id: string) => {
      setSelectedNftId(id);
      setView('detail');
  };

  const handlePurchase = (boughtNft: NftData, seller: User) => {
    if (!currentUser || !boughtNft.price) return;
    
    const platformFee = boughtNft.price * 0.30;
    const sellerProceeds = boughtNft.price * 0.70;

    const updatedNft: NftData = {
        ...boughtNft,
        ownerId: currentUser.id,
        status: 'owned',
        priceHistory: [
            ...boughtNft.priceHistory,
            {
                date: new Date().toISOString(),
                price: boughtNft.price,
                type: 'sale',
                sellerId: seller.id,
                buyerId: currentUser.id,
                platformFee,
                sellerProceeds,
            }
        ]
    };
    
    const updatedNfts = allNfts.map(n => n.id === updatedNft.id ? updatedNft : n);
    updateAndSaveNfts(updatedNfts);

    // Update wallet balances
    const updatedUsers = allUsers.map(u => {
        if (u.id === currentUser.id) return { ...u, walletBalance: u.walletBalance - boughtNft.price! };
        if (u.id === seller.id) return { ...u, walletBalance: u.walletBalance + sellerProceeds };
        if (u.id === PLATFORM_USER_ID) return { ...u, walletBalance: u.walletBalance + platformFee };
        return u;
    });
    updateAndSaveUsers(updatedUsers);
  };

  const handleUpdateNft = (updatedNft: NftData) => {
      const updatedNfts = allNfts.map(nft => nft.id === updatedNft.id ? updatedNft : nft);
      updateAndSaveNfts(updatedNfts);
  };
  
  const handleViewChange = (view: AppView) => {
      setView(view);
      setSelectedNftId(null);
  };

  const handleAdminLoginSuccess = () => {
    setShowLoginModal(false);
    setView('admin');
  };
  
  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} allUsers={allUsers} />;
  }

  const renderContent = () => {
      switch(view) {
          case 'create':
              return <CreateNftFlow currentUser={currentUser} onLaunch={handleLaunchNft} onBack={() => handleViewChange('marketplace')} />;
          case 'detail':
              const selectedNft = allNfts.find(nft => nft.id === selectedNftId);
              if (selectedNft) {
                const owner = allUsers.find(u => u.id === selectedNft.ownerId);
                const creator = allUsers.find(u => u.id === selectedNft.creatorId);
                if (!owner || !creator) return <p>Error: NFT owner or creator not found.</p>;
                return <NftDetailPage 
                            nftData={selectedNft} 
                            currentUser={currentUser}
                            owner={owner}
                            creator={creator}
                            onPurchase={handlePurchase}
                            onUpdate={handleUpdateNft} 
                            onBack={() => handleViewChange('marketplace')} 
                        />;
              }
              setView('marketplace');
              return null;
          case 'admin':
              return <AdminPanel nfts={allNfts} users={allUsers} onBack={() => handleViewChange('marketplace')} />;
          case 'profile':
              return <ProfilePage currentUser={currentUser} allNfts={allNfts} allUsers={allUsers} onSelectNft={handleSelectNft} />;
          case 'marketplace':
          default:
              return <Marketplace nfts={allNfts} onSelectNft={handleSelectNft} onCreateNew={() => setView('create')} />;
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-indigo-950 to-black flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {showLoginModal && <LoginModal onLoginSuccess={handleAdminLoginSuccess} onCancel={() => setShowLoginModal(false)} />}
      <div className="w-full max-w-7xl mx-auto">
        <AppHeader currentUser={currentUser} onLogout={handleLogout} onNavigate={handleViewChange} onAdminLogin={() => setShowLoginModal(true)} />
        <main className="mt-8">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
