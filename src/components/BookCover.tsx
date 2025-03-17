import React from 'react'

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

interface BookCoverProps {
  book: Book;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
  return (
    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden relative group">
      <img 
        src={book.coverImage} 
        alt={`${book.title} cover`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-10" />
    </div>
  );
};

export default BookCover;
