export interface NftAttribute {
  trait_type: string;
  value: string;
}

export interface NftMetadata {
  name: string;
  description: string;
  attributes: NftAttribute[];
}

export interface NftData {
  prompt: string;
  imageUrl: string | null;
  metadata: NftMetadata | null;
  price: number | null;
  transactionId: string | null;
}

export enum AppStep {
  GENERATE_IMAGE = 1,
  GENERATE_METADATA = 2,
  SET_PRICE = 3,
  LAUNCH_SUCCESS = 4,
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
