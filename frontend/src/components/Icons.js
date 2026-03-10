import React from 'react';

const Gold = "#d4af37";
const Black = "#000000";

// Brand Master Logo
export const CreatorSignalLogo = ({ className = "w-6 h-6", animate = false }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${animate ? 'logo-hover' : ''}`}>
    {/* X Structure */}
    <path d="M20 20L80 80M20 80L45 55M80 20L55 45" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    {/* AI Neural Core */}
    <circle cx="50" cy="50" r="12" fill="white" stroke={Gold} strokeWidth="3"/>
    <circle cx="50" cy="50" r="6" fill={Gold}/>
    {/* Decorative AI Sparks */}
    <path className="logo-spark transition-all duration-500" d="M85 15l2 8M85 15l-8-2M15 85l-2-8M15 85l8 2" stroke={Gold} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Professional Icon Set (20 Vectors)
export const NeuralLink = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor"/>
    <path d="M12 9V3M12 21v-6M18 12h3M3 12h6M17 17l3 3M4 4l3 3M17 7l3-3M4 20l3-3" stroke={Gold}/>
  </svg>
);

export const XAlgorithm = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 4l16 16M4 20l6.5-6.5M20 4l-6.5 6.5" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="2" fill={Gold}/>
  </svg>
);

export const AIBrain = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor"/>
    <path d="M12 12v6m-3 0h6m-3 0c-2 0-4-1-4-3" stroke={Gold}/>
  </svg>
);

export const SparkleGenAI = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z" fill={Gold} stroke="currentColor"/>
  </svg>
);

export const DataNode = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor"/>
    <path d="M12 8V4m0 16v-4m8-4h-4M4 12h4" stroke={Gold}/>
  </svg>
);

export const GlobalIntelligence = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor"/>
    <path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 10" stroke={Gold} strokeOpacity="0.6"/>
  </svg>
);

export const ChipProcessor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor"/>
    <path d="M9 5V3m6 2V3m4 6h2m-2 6h2m-6 10v-2m-6 2v-2M3 15h2M3 9h2" stroke={Gold}/>
  </svg>
);

export const PromptIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 8l4 4-4 4" stroke="currentColor" strokeWidth="2"/>
    <line x1="11" y1="16" x2="18" y2="16" stroke={Gold} strokeWidth="2"/>
  </svg>
);

export const VisionSensor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" stroke="currentColor"/>
    <circle cx="12" cy="12" r="3" stroke={Gold}/>
  </svg>
);

export const DeepLearning = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2l10 5v10l-10 5-10-5V7l10-5z" stroke="currentColor"/>
    <path d="M12 22V12m0 0l10-5M12 12L2 7" stroke={Gold}/>
  </svg>
);

export const Automation = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="4" stroke="currentColor"/>
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke={Gold}/>
  </svg>
);

export const BinaryStream = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 6h2v12H8M14 6h2v12h-2" stroke="currentColor"/>
    <path d="M12 8v8" stroke={Gold} strokeDasharray="2 2"/>
  </svg>
);

export const XPostAI = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor"/>
    <path d="M15 3h6v6m-9 3l9-9" stroke={Gold}/>
  </svg>
);

export const ChatBot = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor"/>
    <path d="M9 11h.01M15 11h.01" stroke={Gold} strokeWidth="2"/>
    <path d="M10 14h4" stroke="currentColor"/>
  </svg>
);

export const SearchDiscover = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor"/>
    <path d="M21 21l-4.35-4.35" stroke={Gold} strokeWidth="2"/>
  </svg>
);

export const ShieldSafety = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L4 5v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V5l-8-3z" stroke="currentColor"/>
    <path d="M9 12l2 2 4-4" stroke={Gold}/>
  </svg>
);

export const GrowthScale = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 20h18M6 16l4-4 4 4 6-6" stroke="currentColor"/>
    <path d="M16 10h4v4" stroke={Gold}/>
  </svg>
);

export const VoiceAudio = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5v14M8 9v6m8-6v6M4 11v2m16-2v2" stroke={Gold} strokeLinecap="round"/>
    <path d="M2 12h20" stroke="currentColor" strokeOpacity="0.2"/>
  </svg>
);

export const Connection = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="18" cy="5" r="3" stroke="currentColor"/>
    <circle cx="6" cy="12" r="3" stroke="currentColor"/>
    <circle cx="18" cy="19" r="3" stroke="currentColor"/>
    <path d="M8.5 10.5l6.5-4M8.5 13.5l6.5 4" stroke={Gold}/>
  </svg>
);

export const VerifiedAI = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2l3 2 4-1-1 4 2 3-2 3 1 4-4-1-3 2-3-2-4 1 1-4-2-3 2-3-1-4 4 1 3-2z" stroke="currentColor"/>
    <path d="M9 12l2 2 4-4" stroke={Gold}/>
  </svg>
);

export const FingerprintIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2a10 10 0 0 0-10 10c0 1.25.23 2.45.65 3.55" stroke="currentColor"/>
    <path d="M12 22a10 10 0 0 0 10-10c0-1.25-.23-2.45-.65-3.55" stroke={Gold}/>
    <path d="M8 12a4 4 0 0 1 8 0" stroke="currentColor"/>
    <path d="M12 12v4" stroke={Gold}/>
  </svg>
);

export const TargetIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="4" stroke="currentColor"/>
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke={Gold}/>
  </svg>
);
