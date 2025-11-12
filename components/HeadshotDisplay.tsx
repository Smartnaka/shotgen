import React, { useState } from 'react';
import Loader from './Loader';
import { EditIcon } from './icons/EditIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface HeadshotDisplayProps {
  originalImage: string;
  generatedImage: string;
  onEdit: (prompt: string) => void;
  isEditing: boolean;
  onStartOver: () => void;
}

const HeadshotDisplay: React.FC<HeadshotDisplayProps> = ({ originalImage, generatedImage, onEdit, isEditing, onStartOver }) => {
  const [editPrompt, setEditPrompt] = useState('');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPrompt.trim() && !isEditing) {
      onEdit(editPrompt.trim());
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const mimeType = generatedImage.match(/data:(image\/[a-z]+);/)?.[1];
    const extension = mimeType ? mimeType.split('/')[1] : 'png';
    link.download = `ai-headshot.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center">
       <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">Your New Headshot is Ready!</h2>
       <p className="text-gray-400 mb-8 text-center">Download your image, fine-tune it with a text prompt, or start over.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Original Selfie</h3>
          <img src={originalImage} alt="Original" className="rounded-lg shadow-lg w-full max-w-md object-contain" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Generated Headshot</h3>
          <div className="relative w-full max-w-md">
            <img src={generatedImage} alt="Generated" className="rounded-lg shadow-lg w-full object-contain" />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-zinc-900 p-6 rounded-lg shadow-2xl border border-zinc-800">
        <h3 className="text-lg font-bold mb-4 flex items-center"><EditIcon className="w-6 h-6 mr-2 text-teal-400" /> Edit Your Headshot</h3>
        <form onSubmit={handleEditSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., 'Add a retro filter' or 'Make the background darker'"
            className="flex-grow bg-zinc-800 border border-zinc-700 text-white rounded-md px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            disabled={isEditing}
          />
          <button 
            type="submit" 
            disabled={isEditing || !editPrompt.trim()}
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isEditing ? <Loader /> : 'Apply Edit'}
          </button>
        </form>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all duration-300 flex items-center justify-center"
        >
          <DownloadIcon className="w-6 h-6 mr-3" />
          Download Headshot
        </button>
        <button 
          onClick={onStartOver}
          className="text-gray-400 hover:text-teal-300 transition-colors"
        >
          Start Over with a New Photo
        </button>
      </div>

    </div>
  );
};

export default HeadshotDisplay;