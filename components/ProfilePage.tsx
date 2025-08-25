import React from 'react';
import type { User, NftData, PriceHistoryEntry } from '../types';
import NftCard from './NftCard';

interface ProfilePageProps {
    currentUser: User;
    allNfts: NftData[];
    allUsers: User[];
    onSelectNft: (id: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, allNfts, allUsers, onSelectNft }) => {
    const ownedNfts = allNfts.filter(nft => nft.ownerId === currentUser.id);
    const createdNfts = allNfts.filter(nft => nft.creatorId === currentUser.id);
    
    const userMap = new Map(allUsers.map(user => [user.id, user.username]));

    const transactionHistory = allNfts
        .flatMap(nft => 
            nft.priceHistory
                .filter(entry => entry.type === 'sale' && (entry.buyerId === currentUser.id || entry.sellerId === currentUser.id))
                .map(entry => ({ ...entry, nftName: nft.metadata?.name || 'Unknown NFT' }))
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="animate-fade-in-up space-y-12">
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-8 text-center">
                <h1 className="text-4xl font-bold">{currentUser.username}</h1>
                <p className="text-gray-400">Member since today</p>
                <div className="mt-4 inline-block bg-brand-background/50 border border-green-500/50 rounded-full px-6 py-2">
                    <span className="text-gray-300">Wallet Balance: </span>
                    <span className="text-2xl font-bold text-green-400">Ξ {currentUser.walletBalance.toFixed(4)}</span>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">My Collection ({ownedNfts.length})</h2>
                {ownedNfts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {ownedNfts.map(nft => <NftCard key={nft.id} nft={nft} onSelect={() => onSelectNft(nft.id)} />)}
                    </div>
                ) : (
                    <p className="text-gray-400">You don't own any NFTs yet. Go to the marketplace to buy one!</p>
                )}
            </div>
            
             <div>
                <h2 className="text-2xl font-bold mb-4">Created by Me ({createdNfts.length})</h2>
                {createdNfts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {createdNfts.map(nft => <NftCard key={nft.id} nft={nft} onSelect={() => onSelectNft(nft.id)} />)}
                    </div>
                ) : (
                    <p className="text-gray-400">You haven't created any NFTs. Get started and mint your first creation!</p>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                <div className="bg-brand-surface/50 rounded-lg border border-white/10 max-h-96 overflow-y-auto">
                    {transactionHistory.length > 0 ? (
                        <ul className="divide-y divide-gray-700">
                            {transactionHistory.map((tx, index) => {
                                const isBuyer = tx.buyerId === currentUser.id;
                                return (
                                    <li key={index} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{tx.nftName}</p>
                                            <p className="text-sm text-gray-400">
                                                {isBuyer ? `Bought from ${userMap.get(tx.sellerId!) || 'Unknown'}` : `Sold to ${userMap.get(tx.buyerId!) || 'Unknown'}`}
                                            </p>
                                            <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleString()}</p>
                                        </div>
                                        <div className={`text-lg font-bold text-right ${isBuyer ? 'text-red-400' : 'text-green-400'}`}>
                                            {isBuyer ? `-` : `+`}Ξ {isBuyer ? tx.price.toFixed(4) : tx.sellerProceeds?.toFixed(4)}
                                            { !isBuyer && <p className="text-xs font-normal text-gray-500">(Fee: Ξ {tx.platformFee?.toFixed(4)})</p> }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="p-8 text-center text-gray-400">No transaction history yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
