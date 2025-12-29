import React, { useEffect, useState } from 'react';
import { TARGET_DATE_ISO } from '../constants';
import { TimeLeft } from '../types';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(TARGET_DATE_ISO) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 min-w-[70px] sm:min-w-[100px]">
      <span className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tighter text-slate-100 font-serif tabular-nums animate-fade-in-up">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-rose-200/60 mt-1 sm:mt-2 font-sans">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-[90vw] md:max-w-4xl mx-auto bg-black/20 backdrop-blur-sm rounded-xl border border-white/5 p-4 sm:p-8 shadow-2xl">
      <div className="grid grid-cols-4 gap-0 sm:gap-4 divide-x divide-white/5">
        <TimeUnit value={timeLeft.days} label="Dias" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
};

export default Countdown;