import React from 'react';
import { HeadshotStyle } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyle: HeadshotStyle | null;
  onSelectStyle: (style: HeadshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {styles.map((style) => (
        <div
          key={style.id}
          onClick={() => onSelectStyle(style)}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedStyle?.id === style.id ? 'border-teal-500 shadow-teal-500/30 shadow-lg' : 'border-zinc-800 hover:border-teal-600'
          }`}
        >
          {selectedStyle?.id === style.id && (
            <div className="absolute top-2 right-2 z-10 bg-teal-500 rounded-full p-1 text-white">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
          )}
          <img src={style.imageUrl} alt={style.name} className="w-full h-32 object-cover" />
          <div className="p-4 bg-zinc-900">
            <h3 className="font-semibold text-lg text-white">{style.name}</h3>
          </div>
          <div className={`absolute inset-0 bg-teal-500 transition-opacity duration-300 ${selectedStyle?.id === style.id ? 'opacity-20' : 'opacity-0'}`} />
        </div>
      ))}
    </div>
  );
};

export default StyleSelector;