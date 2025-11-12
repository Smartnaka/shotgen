import React from 'react';
import { CameraIcon } from './icons/CameraIcon';

export const Header: React.FC = () => (
    <header className="w-full text-center p-6 bg-black/50 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto flex items-center justify-center">
            <CameraIcon className="w-8 h-8 md:w-10 md:h-10 text-teal-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                AI Headshot <span className="text-teal-400">Photographer</span>
            </h1>
        </div>
    </header>
);