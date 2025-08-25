export interface User {
    id: string;
    username: string;
    password: string; // Stored in plain text for simulation purposes ONLY.
    walletBalance: number;
}

export interface NftAttribute {
  trait_type: string;
  value: string;
}

export interface NftMetadata {
  name: string;
  description: string;
  attributes: NftAttribute[];
}

export type NftStatus = 'for_sale' | 'owned';
export type PriceHistoryType = 'list' | 'sale' | 'relist';

export interface PriceHistoryEntry {
    date: string;
    price: number;
    type: PriceHistoryType;
    sellerId?: string;
    buyerId?: string;
    platformFee?: number;
    sellerProceeds?: number;
}

export interface NftData {
  id: string;
  prompt: string;
  imageUrl: string | null;
  metadata: NftMetadata | null;
  price: number | null;
  transactionId: string | null;
  ownerId: string; // The User ID of the current owner
  creatorId: string; // The User ID of the original creator
  status: NftStatus;
  priceHistory: PriceHistoryEntry[];
}

export enum AppStep {
  GENERATE_IMAGE = 1,
  GENERATE_METADATA = 2,
  SET_PRICE = 3,
}

export type AppView = 'marketplace' | 'create' | 'detail' | 'admin' | 'profile';


export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
