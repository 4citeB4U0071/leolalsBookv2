export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  description: string;
  genres: string[];
  genreDescription: string;
  frontMatter?: { dedication: string; };
  tableOfContents?: string[];
  pages: { title: string; content: string; }[];
}
