import React from 'react';
import { Book } from '../types';
import { motion } from 'framer-motion';

interface EnhancedBookCardProps {
  book: Book;
}

const EnhancedBookCard: React.FC<EnhancedBookCardProps> = ({ book }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={book.coverImageUrl} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {book.title}
        </h2>
        <p className="text-purple-300 font-medium">
          By {book.author}
        </p>
        <p className="text-gray-300 line-clamp-3">
          {book.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {book.genres.map((genre) => (
            <span 
              key={genre}
              className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedBookCard;
