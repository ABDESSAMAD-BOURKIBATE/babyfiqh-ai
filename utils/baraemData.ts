
import { Language } from './translations';

export interface BaraemVideo {
    id: string;
    videoId: string; // YouTube ID
    title: Record<Language, string>;
    category: 'cartoons' | 'anasheed' | 'education' | 'stories' | 'manners';
}

// Curated list of safe, educational, ad-free friendly videos (Verified IDs)
// Currently empty as per request.
export const baraemVideos: BaraemVideo[] = [];
