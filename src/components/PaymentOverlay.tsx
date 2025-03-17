import React from 'react';
import { X, Coffee, Heart, Palette } from 'lucide-react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import GiftBox from './GiftBox';

interface PaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
}

const PaymentOverlay: React.FC<PaymentOverlayProps> = ({
  isOpen,
  onClose,
  bookTitle
}) => {
  if (!isOpen) return null;

  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-blue-900/90 backdrop-blur-sm rounded-lg max-w-md w-full p-6 border border-blue-500/30 shadow-xl transform-gpu hover:scale-[1.02] transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <GiftBox />
            <h2 className="text-2xl font-bold text-white">Support Leola</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-800/50 rounded-full text-white transition-colors"
            aria-label="Close payment overlay"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-200 text-lg leading-relaxed">
              {bookTitle
                ? `Thank you for reading "${bookTitle}". Your support means the world to Leola!`
                : "Thank you for reading. Your support means the world to Leola!"}
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              Choose your preferred way to support below. Every contribution helps Leola continue creating amazing content.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg border border-blue-500/20">
              {(!stripe || !elements) ? (
                <div className="text-red-400 p-3 rounded bg-red-900/20 text-center">
                  <p>Payment system is initializing...</p>
                  <p className="text-sm mt-1">Please wait a moment or refresh the page if this persists.</p>
                </div>
              ) : (
                <CheckoutForm />
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button 
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg transition-all transform-gpu hover:scale-[1.02] hover:shadow-lg shadow-purple-500/20"
                onClick={() => window.open('https://buymeacoffee.com/leola', '_blank')}
              >
                <Coffee className="h-5 w-5" />
                <span>Buy Me a Coffee</span>
              </button>
              
              <button 
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg transition-all transform-gpu hover:scale-[1.02] hover:shadow-lg shadow-blue-500/20"
                onClick={() => window.open('https://patreon.com/leola', '_blank')}
              >
                <Heart className="h-5 w-5" />
                <span>Support on Patreon</span>
              </button>
              
              <button 
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg transition-all transform-gpu hover:scale-[1.02] hover:shadow-lg shadow-green-500/20"
                onClick={() => window.open('https://ko-fi.com/leola', '_blank')}
              >
                <Palette className="h-5 w-5" />
                <span>Support on Ko-fi</span>
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 text-center italic">
            Your support helps keep Leola's digital library growing. Thank you! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverlay;