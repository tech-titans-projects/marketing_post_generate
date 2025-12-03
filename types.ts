
export enum CopyType {
  PRODUCT_DESCRIPTION = 'Product Description',
  FACEBOOK_POST = 'Facebook Post',
  INSTAGRAM_CAPTION = 'Instagram Caption',
  TWEET = 'Tweet',
  LINKEDIN_POST = 'LinkedIn Post',
}

export type MarketingCopyType = `${CopyType}`;

export const TONES = ['Professional', 'Casual', 'Witty', 'Persuasive', 'Empathetic', 'Bold'] as const;
export type Tone = typeof TONES[number];

export const LENGTHS = ['Short', 'Medium', 'Long'] as const;
export type Length = typeof LENGTHS[number];

export interface GenerateOptions {
  copyType: MarketingCopyType;
  productName: string;
  targetAudience: string;
  features: string;
  tone: Tone;
  length: Length;
  creativity: number;
}

export interface PerformanceMetrics {
  generationTime: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
