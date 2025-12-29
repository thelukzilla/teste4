import React, { useState } from 'react';
import Background from './components/Background';
import Countdown from './components/Countdown';
import Phrase from './components/Phrase';
import YouTubePlayer from './components/YouTubePlayer';
import { Heart, Play } from 'lucide-react';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-rose-900 selection:text-white">
      <Background />
      <YouTubePlayer isPlaying={started} />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-8 overflow-hidden">
        
        {!started ? (
          // Landing Screen
          <button 
            onClick={handleStart}
            className="group flex flex-col items-center justify-center space-y-8 animate-fade-in transition-all duration-700 hover:scale-105 focus:outline-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 flex items-center justify-center bg-black/30 backdrop-blur-md shadow-2xl">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-rose-200 fill-rose-200/20 ml-1 group-hover:text-rose-100 transition-colors" />
              </div>
            </div>
            <span className="text-lg sm:text-xl font-light tracking-[0.3em] uppercase text-slate-300 group-hover:text-white transition-colors">
              Clique para começar
            </span>
          </button>
        ) : (
          // Active Content
          <div className="w-full flex flex-col items-center animate-fade-in duration-1000">
            
            {/* Header */}
            <header className="mb-12 text-center animate-slide-down">
              <div className="flex items-center justify-center space-x-3 mb-4 opacity-80">
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-rose-400/50"></div>
                <Heart size={16} className="text-rose-500 fill-rose-500/20 animate-pulse" />
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-rose-400/50"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-wide">
                Anna Beatriz
              </h1>
            </header>

            {/* Countdown */}
            <Countdown />

            {/* Daily Phrase */}
            <Phrase />

            {/* Footer Text */}
            <div className="mt-16 sm:mt-24 text-center opacity-60 animate-fade-in delay-1000">
              <p className="text-sm sm:text-base font-light tracking-widest uppercase text-rose-200/80">
                Algumas pessoas não se esquecem. Se esperam.
              </p>
            </div>
            
            <div className="mt-8 opacity-30 hover:opacity-100 transition-opacity duration-500">
               <div className="flex gap-1 h-1">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                 ))}
               </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;