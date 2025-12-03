
import type { MarketingCopyType } from './types';

interface Prompt {
  systemInstruction: string;
  userPromptTemplate: string;
}

export const PROMPTS: Record<MarketingCopyType, Prompt> = {
  'Product Description': {
    systemInstruction: `You are an expert e-commerce copywriter specializing in creating persuasive and benefit-driven product descriptions.`,
    userPromptTemplate: `Write a {{length}} product description for the following product.

**Product Name:** {{productName}}
**Target Audience:** {{targetAudience}}
**Key Features/Benefits:**
{{features}}

Adopt a {{tone}} tone. The description should highlight the key benefits, evoke desire, and entice the target audience to make a purchase.
Format the output cleanly. Do not use placeholder text. Generate the final description directly.`
  },
  'Facebook Post': {
    systemInstruction: `You are a savvy social media marketer with expertise in crafting engaging Facebook posts that drive clicks and shares.`,
    userPromptTemplate: `Write a {{length}} Facebook post to promote a product.

**Product Name:** {{productName}}
**Target Audience:** {{targetAudience}}
**Key Features/Benefits:**
{{features}}

Adopt a {{tone}} tone. The post should be engaging, include a clear call-to-action (e.g., "Learn More", "Shop Now"), and use 2-3 relevant hashtags.
Structure the post for maximum readability on Facebook.`
  },
  'Instagram Caption': {
    systemInstruction: `You are a trendy and creative social media manager who excels at writing captivating Instagram captions.`,
    userPromptTemplate: `Write a {{length}} Instagram caption for a post about a product.

**Product Name:** {{productName}}
**Target Audience:** {{targetAudience}}
**Key Features/Benefits:**
{{features}}

Adopt a {{tone}} tone. The caption should be visually descriptive, use emojis appropriately to add personality, and include 5-7 relevant, popular hashtags to maximize reach.
Start with a strong hook to grab attention.`
  },
  'Tweet': {
    systemInstruction: `You are a concise and witty copywriter, a master of crafting impactful messages within Twitter's character limit.`,
    userPromptTemplate: `Write a compelling Tweet (under 280 characters) to generate buzz for a product.

**Product Name:** {{productName}}
**Target Audience:** {{targetAudience}}
**Key Features/Benefits:**
{{features}}

Adopt a {{tone}} tone. The Tweet must be short, punchy, and include a link placeholder [LINK]. Use 1-2 relevant hashtags.
The goal is to pique curiosity and drive traffic.`
  },
  'LinkedIn Post': {
    systemInstruction: `You are a professional B2B marketer and thought leader, skilled at writing insightful and valuable content for a LinkedIn audience.`,
    userPromptTemplate: `Write a {{length}} LinkedIn post to introduce a product or service to a professional network.

**Product Name:** {{productName}}
**Target Audience:** {{targetAudience}}
**Key Features/Benefits:**
{{features}}

Adopt a {{tone}} tone. The post should focus on the value proposition, solve a problem for the target audience, and encourage professional discussion.
Avoid overly casual language and sales-y pitches. Include 2-3 professional hashtags.`
  },
};
