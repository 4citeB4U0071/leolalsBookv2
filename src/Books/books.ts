import { NeedleAndYarnBookContent } from './NeedleAndYarn';
import { CrochetMasteryBookContent } from './CrochetMastery';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  content: string;
  bubbleColor: string;
  gradient: string;
  genres: string[];
}

export const books: Book[] = [
  {
    id: 'needle-and-yarn',
    title: 'Needle & Yarn: A Love Stitched in Time',
    author: 'Leola (Sista) Lee',
    description: 'A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.',
    coverImage: '/src/Books/NeedleandYarn.png',
    content: NeedleAndYarnBookContent,
    bubbleColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    genres: ['Romance', 'Crafting', 'Educational', 'Fantasy']
  },
  {
    id: 'crochet-mastery',
    title: 'Crochet Mastery: A Complete Guide',
    author: 'Leola (Sista) Lee',
    description: 'A comprehensive guide to mastering crochet, from basic stitches to advanced techniques.',
    coverImage: '/src/Books/CrochetMaster.png',
    content: CrochetMasteryBookContent,
    bubbleColor: '#EC4899',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)',
    genres: ['Educational', 'Crafting', 'Reference', 'Tutorial']
  }
];