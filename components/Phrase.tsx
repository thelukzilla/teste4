import React, { useMemo } from 'react';
import { PHRASES } from '../constants';
import { Quote } from 'lucide-react';

const Phrase: React.FC = () => {
  const dailyPhrase = useMemo(() => {
    // Calculate days since epoch to get a consistent daily index
    const now = new Date();
    // Offset for Brazil time roughly to ensure switch happens at midnight
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    return PHRASES[dayOfYear % PHRASES.length];
  }, []);

  return (
    <div className="mt-12 md:mt-16 max-w-2xl mx-auto px-6 text-center animate-fade-in delay-500 duration-1000">
      <div className="inline-block mb-4 text-rose-500/50">
        <Quote size={24} className="fill-current" />
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-200 leading-relaxed italic opacity-90">
        “{dailyPhrase}”
      </p>
    </div>
  );
};

export default Phrase;