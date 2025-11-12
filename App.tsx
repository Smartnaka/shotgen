import React, { useState, useCallback } from 'react';
import { HeadshotStyle } from './types';
import { generateHeadshot, editHeadshot } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import { HEADSHOT_STYLES } from './constants';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import HeadshotDisplay from './components/HeadshotDisplay';
import Loader from './components/Loader';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setOriginalImageFile(file);
    try {
      const preview = await fileToBase64(file);
      setOriginalImagePreview(preview);
      setError(null);
      setGeneratedImage(null);
      setSelectedStyle(null);
    } catch (err) {
      setError('Could not create image preview.');
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImageFile || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(originalImageFile);
      const mimeType = originalImageFile.type;
      const { prompt } = selectedStyle;
      
      const resultBase64 = await generateHeadshot(base64Image, mimeType, prompt);
      setGeneratedImage(`data:${mimeType};base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  }, [originalImageFile, selectedStyle]);
  
  const handleEdit = useCallback(async (editPrompt: string) => {
    if (!generatedImage) {
      setError('No generated image to edit.');
      return;
    }
    
    setIsEditing(true);
    setError(null);
    
    try {
      const base64Data = generatedImage.split(',')[1];
      const mimeType = generatedImage.match(/data:(.*);/)?.[1] || 'image/png';

      const resultBase64 = await editHeadshot(base64Data, mimeType, editPrompt);
      setGeneratedImage(`data:${mimeType};base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during editing.');
    } finally {
      setIsEditing(false);
    }
  }, [generatedImage]);

  const handleStartOver = () => {
    setOriginalImageFile(null);
    setOriginalImagePreview(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setIsGenerating(false);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {error && <ErrorDisplay message={error} onDismiss={() => setError(null)} />}

        {!originalImagePreview && <ImageUploader onImageUpload={handleImageUpload} />}
        
        {originalImagePreview && !generatedImage && (
          <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
             <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">Step 2: Choose Your Style</h2>
             <p className="text-gray-400 mb-6 text-center">Select a professional style for your new headshot.</p>
             <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6 shadow-lg">
                <img src={originalImagePreview} alt="Your selfie" className="max-h-48 rounded-md mx-auto" />
             </div>
             <StyleSelector styles={HEADSHOT_STYLES} selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />
             <button
                onClick={handleGenerate}
                disabled={!selectedStyle || isGenerating}
                className="mt-8 w-full max-w-md px-8 py-4 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? <Loader /> : 'Generate Headshot'}
             </button>
          </div>
        )}

        {isGenerating && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl">
                <Loader />
                <h3 className="text-xl font-semibold mt-4 text-teal-400">Creating your headshot...</h3>
                <p className="text-gray-400 mt-2">The AI is working its magic. This might take a moment.</p>
            </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="w-full max-w-6xl animate-fade-in">
            <HeadshotDisplay 
              originalImage={originalImagePreview!}
              generatedImage={generatedImage}
              onEdit={handleEdit}
              isEditing={isEditing}
              onStartOver={handleStartOver}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;