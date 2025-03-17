import { NeedleAndYarnBookContent } from './NeedleAndYarn';
import { CrochetMasteryBookContent } from './CrochetMastery';
import NeedleandYarnCover from './NeedleandYarn.png';
import CrochetMasterCover from './CrochetMaster.png';

export const books = [
  {
    id: 'needle-and-yarn',
    title: 'Needle & Yarn: A Love Stitched in Time',
    author: 'Leola (Sista) Lee',
    description: 'A heartwarming tale...',
    coverImageUrl: NeedleandYarnCover,
    content: NeedleAndYarnBookContent,   // Remove .toString()
    bubbleColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    genres: ['Romance', 'Crafting']
  },
  {
    id: 'crochet-mastery',
    title: 'Crochet Mastery: A Complete Guide',
    author: 'Leola (Sista) Lee',
    description: 'A comprehensive guide...',
    coverImageUrl: CrochetMasterCover,
    content: CrochetMasteryBookContent,  // Remove .toString()
    bubbleColor: '#EC4899',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)',
    genres: ['Educational', 'Crafting']
  }
];
