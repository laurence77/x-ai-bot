'use client';
import Link from 'next/link';
import FuzzyText from '@/components/FuzzyText';
import { ShieldSafety } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-8 transition-colors">
      <div className="relative mb-8">
        <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover
          glitchMode
          color="#d4af37"
          fontSize="clamp(4rem, 20vw, 15rem)"
        >
          404
        </FuzzyText>
      </div>

      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-2xl font-black dark:text-white text-black uppercase tracking-widest flex items-center justify-center gap-3">
          <ShieldSafety className="w-6 h-6 text-[#d4af37]" />
          Narrative Lost
        </h1>
        <p className="dark:text-slate-400 text-slate-600 font-medium leading-relaxed">
          The algorithm couldn't find this strategic node. Your request has been redirected to the War Room for analysis.
        </p>
        <Link 
          href="/"
          className="inline-block bg-[#d4af37] hover:bg-[#c4a030] text-black font-black px-8 py-4 rounded-xl transition-all uppercase tracking-tight shadow-lg shadow-[#d4af37]/10"
        >
          Back to War Room
        </Link>
      </div>
    </div>
  );
}
