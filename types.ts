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
export type NftOwner = 'creator' | 'user';
export type PriceHistoryType = 'list' | 'sale' | 'relist';

export interface PriceHistoryEntry {
    date: string;
    price: number;
    type: PriceHistoryType;
}

export interface NftData {
  id: string;
  prompt: string;
  imageUrl: string | null;
  metadata: NftMetadata | null;
  price: number | null;
  transactionId: string | null;
  owner: NftOwner;
  status: NftStatus;
  priceHistory: PriceHistoryEntry[];
}

export enum AppStep {
  GENERATE_IMAGE = 1,
  GENERATE_METADATA = 2,
  SET_PRICE = 3,
}

export type AppView = 'marketplace' | 'create' | 'detail';


export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}