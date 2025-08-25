
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
}

export enum AppStep {
  GENERATE_IMAGE = 1,
  GENERATE_METADATA = 2,
  LAUNCH_SUCCESS = 3,
}
