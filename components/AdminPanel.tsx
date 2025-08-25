import React from 'react';
import type { NftData, User } from '../types';

interface AdminPanelProps {
    nfts: NftData[];
    users: User[];
    onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ nfts, users, onBack }) => {
    const userMap = new Map(users.map(user => [user.id, user.username]));

    return (
        <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-6 sm:p-10 transition-all duration-500 animate-fade-in-up">
            <button onClick={onBack} className="mb-6 text-sm text-brand-secondary hover:underline">
                &larr; Back to Marketplace
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel - All NFTs</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-brand-background/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Owner</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Current Price</th>
                            <th scope="col" className="px-6 py-3">NFT ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nfts.length > 0 ? nfts.map(nft => (
                            <tr key={nft.id} className="bg-brand-surface/80 border-b border-gray-700 hover:bg-gray-700/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {nft.metadata?.name || 'N/A'}
                                </th>
                                <td className="px-6 py-4 capitalize">{userMap.get(nft.ownerId) || 'Unknown'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        nft.status === 'for_sale' ? 'bg-green-900 text-green-300' : 'bg-purple-900 text-purple-300'
                                    }`}>
                                        {nft.status === 'for_sale' ? 'For Sale' : 'Owned'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono">Ξ {nft.price?.toFixed(4) || 'N/A'}</td>
                                <td className="px-6 py-4 font-mono text-gray-500">{nft.id.substring(0, 12)}...</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center py-10">No NFT data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
