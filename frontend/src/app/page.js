'use client';

import React, { useState, useEffect } from 'react';  
import {  
  Users,
  Award,
  AlertTriangle,
  PenTool,
  MessageSquare,
  Settings,
  Zap,
  Lock,
  RefreshCw,
  CheckCircle2,
  Brain,
  TrendingUp,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';  
import { 
  ShieldSafety,
  NeuralLink,
  TargetIcon,
  DataNode,
  FingerprintIcon,
  VisionSensor,
  SparkleGenAI,
  VerifiedAI,
  GrowthScale,
  CreatorSignalLogo
} from '@/components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from '@/components/BlurText';
import TextType from '@/components/TextType';
import DecryptedText from '@/components/DecryptedText';
import VariableProximity from '@/components/VariableProximity';
import TargetCursor from '@/components/TargetCursor';
import GradualBlur from '@/components/GradualBlur';
import SplashCursor from '@/components/SplashCursor';
import Waves from '@/components/Waves';
import LetterGlitch from '@/components/LetterGlitch';
import { useRef } from 'react';

const MOCK_FINGERPRINT = {  
  tone: "Authoritative yet accessible",  
  vocabulary: ["Infrastructure", "Hardening", "Leverage", "Moat"],  
  emojiDensity: 0.02,  
  avgSentenceLength: 12,  
  sentenceVariety: "High",  
  forbiddenWords: ["Inspirational", "Actually", "Just"]  
};  
  
const MOCK_BIO_ALIGNMENT = {  
  profileVisits24h: 1240,  
  followerConversionRate: 0.012,  
  topInterestSegment: "Founders / SaaS",  
  mismatchReason: "Bio focuses on 'Daily Routine' while viral post focused on 'Enterprise Architecture'.",  
  suggestedBio: "Helping Enterprise Founders harden their SaaS architecture. Systems > Hype."  
};  
  
const MOCK_HIJACK_TARGETS = [  
  {  
    id: 'h1',  
    handle: '@SaaS_Guru',  
    text: "AI is overhyped. Every company is just a wrapper.",  
    ratio: 4.2,  
    opportunity: "High: Post a 'Defense of Vertical AI' thread."  
  }  
];  

export default function App() {  
  const [activeTab, setActiveTab] = useState('warroom');  
  const [isRescuing, setIsRescuing] = useState(false);  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [recentPost, setRecentPost] = useState({  
    text: "The gap between Good SaaS and Enterprise-Grade is trust...",  
    likes: 12,  
    impressions: 1400,  
    timestamp: 0,
    velocity: 'stalling'  
  });  

  useEffect(() => {
    setRecentPost(prev => ({ ...prev, timestamp: Date.now() - 12 * 60000 }));
  }, []);

  const [connectionStatus, setConnectionStatus] = useState({
    isLinked: false,
    handle: null,
    isLinking: false,
    error: null
  });

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    handle: "@johndoe",
    bio: "Helping founders scale." // Default bio
  });

  const [isApplyingBio, setIsApplyingBio] = useState(false);
  const [generatingDraftFor, setGeneratingDraftFor] = useState(null);

  const handleApplyBio = async () => {
    setIsApplyingBio(true);
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUserProfile(prev => ({
      ...prev,
      bio: MOCK_BIO_ALIGNMENT.suggestedBio
    }));
    setIsApplyingBio(false);
  };

  const handleGenerateDraft = async (targetId) => {
    setGeneratingDraftFor(targetId);
    // Simulate complex refutation generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingDraftFor(null);
    alert("Strategic Refutation Draft has been sent to your Creative Studio.");
  };

  const [dashboardStats, setDashboardStats] = useState({
    growthVelocity: 0,
    followerDelta: '',
    viralProbability: 0,
    nextWindow: '',
    dwellTime: 0,
    dwellRank: '',
    isLoading: true
  });

  const [competitors, setCompetitors] = useState([]);
  const [isScanningCompetitors, setIsScanningCompetitors] = useState(true);

  const [lexicalDNA, setLexicalDNA] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [isHardening, setIsHardening] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/dashboard/stats');
      const data = await response.json();
      setDashboardStats({
        growthVelocity: data.growth_velocity,
        followerDelta: data.follower_delta,
        viralProbability: data.viral_probability,
        nextWindow: data.next_window,
        dwellTime: data.dwell_time,
        dwellRank: data.dwell_rank,
        isLoading: false
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  const fetchCompetitors = async () => {
    try {
      setIsScanningCompetitors(true);
      const response = await fetch('http://localhost:8000/v1/competitors/radar');
      const data = await response.json();
      setCompetitors(data);
      setIsScanningCompetitors(false);
    } catch (err) {
      console.error("Failed to fetch competitors", err);
      setIsScanningCompetitors(false);
    }
  };

  const fetchIntelligence = async () => {
    try {
      setIsHardening(true);
      const [lexRes, logRes] = await Promise.all([
        fetch('http://localhost:8000/v1/intelligence/lexical-dna', {
          headers: { 'X-CreatorSignal-Key': 'enterprise-key-alpha' }
        }),
        fetch('http://localhost:8000/v1/enterprise/audit-logs')
      ]);
      const [lexData, logData] = await Promise.all([lexRes.json(), logRes.json()]);
      setLexicalDNA(lexData);
      setAuditLogs(logData);
      setIsHardening(false);
    } catch (err) {
      console.error("Hardening sync failed", err);
      setIsHardening(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchCompetitors();
    fetchIntelligence();
    const statsInterval = setInterval(fetchDashboardStats, 30000);
    const radarInterval = setInterval(fetchCompetitors, 60000); // Radar sync every 60s
    return () => {
      clearInterval(statsInterval);
      clearInterval(radarInterval);
    };
  }, []);

  const handleLinkAccount = async () => {
    setConnectionStatus(prev => ({ ...prev, isLinking: true, error: null }));
    try {
      const response = await fetch('http://localhost:8000/v1/account/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: "sk-neural-handshake-demo",
          target_handle: "@johndoe"
        })
      });
      const data = await response.json();
      if (data.success) {
        setConnectionStatus({
          isLinked: true,
          handle: data.handle,
          isLinking: false,
          error: null
        });
      }
    } catch (err) {
      setConnectionStatus(prev => ({ ...prev, isLinking: false, error: "Handshake Failed" }));
    }
  };

  useEffect(() => {  
    const timer = setTimeout(() => setIsRescuing(true), 3000);  
    return () => clearTimeout(timer);  
  }, []);  

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const renderSidebar = () => (  
    <>
      <div 
        className={`${isMobileMenuOpen ? 'fixed inset-0 bg-black/50 z-40 backdrop-blur-sm' : 'hidden'} md:hidden`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`${isMobileMenuOpen ? 'flex absolute z-50' : 'hidden md:flex relative'} w-64 bg-slate-50/80 dark:bg-black/60 backdrop-blur-xl text-slate-600 dark:text-slate-400 flex-col h-screen border-r border-slate-200 dark:border-[#d4af37]/20 transition-colors shadow-2xl md:shadow-none`}>  
        {isMobileMenuOpen && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full md:hidden">
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between group cursor-pointer logo-hover-trigger">  
        <div className="flex items-center gap-3 font-black dark:text-white text-black">
          <CreatorSignalLogo className="w-10 h-10" animate={true} />
          <div className="flex flex-col">
            <span className="text-xl tracking-tighter flex items-center gap-1.5">
              X<span className="text-slate-300 dark:text-white/20">/</span><span className="text-[#d4af37]">INTELLIGENCE</span>
            </span>
            <span className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.2em] -mt-1">Autonomous Networks</span>
          </div>
        </div>
      </div>  
       
      <nav className="flex-1 p-4 space-y-2">  
        {[  
          { id: 'warroom', name: 'War Room', icon: ShieldSafety },  
          { id: 'intelligence', name: 'Bio Alignment', icon: NeuralLink },  
          { id: 'fingerprint', name: 'Voice DNA', icon: FingerprintIcon },  
          { id: 'hijack', name: 'Narrative Hijack', icon: TargetIcon },  
          { id: 'creative', name: 'Creative Studio', icon: PenTool },  
          { id: 'settings', name: 'Link AI / Settings', icon: Settings },  
        ].map((item) => (  
          <button  
            key={item.id}  
            onClick={() => setActiveTab(item.id)}  
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all cursor-target ${  
              activeTab === item.id  
              ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 shadow-sm shadow-[#d4af37]/5'  
              : 'hover:bg-slate-100 dark:hover:bg-white/5'  
            }`}  
          >  
            <item.icon className="w-4 h-4" />  
            <span className="font-medium">{item.name}</span>  
          </button>  
        ))}  
      </nav>  
  
      <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-4">  
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:opacity-80 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          <RefreshCw className={`w-3 h-3 transition-transform ${isDarkMode ? 'rotate-180' : ''}`} />
        </button>

          <div className="flex items-center gap-3 px-2 py-2">  
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900 border border-[#d4af37] flex items-center justify-center text-xs font-bold text-[#d4af37]">  
            {userProfile.name.split(' ').map(n => n[0]).join('')}  
          </div>  
          <div className="flex flex-col">  
            <span className="text-sm font-semibold dark:text-white text-black">{userProfile.name}</span>  
            <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest">Enterprise Tier</span>  
          </div>  
        </div>  
      </div>  
    </div>
    </>
  );  
  
  const containerRef = useRef(null);

  return (  
    <div className="flex h-screen bg-white dark:bg-black font-sans text-slate-900 dark:text-white transition-colors relative overflow-hidden">  
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Waves
          lineColor="#d4af37"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={30}
          waveAmpY={15}
          friction={0.9}
          tension={0.01}
          maxCursorMove={80}
          xGap={15}
          yGap={40}
        />
      </div>
      <SplashCursor />
      <TargetCursor 
        spinDuration={3}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      {renderSidebar()}  
       
      <main className="flex-1 overflow-y-auto relative">  
        <GradualBlur 
          position="top"
          height="4rem"
          strength={1.5}
          divCount={8}
          curve="bezier"
        />
        {activeTab === 'settings' && (  
        <div className="space-y-6">  
          <div className="dark:bg-black bg-slate-50 border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden relative min-h-[400px]">  
            <div className="absolute inset-0 z-0">
               <LetterGlitch
                 glitchSpeed={50}
                 centerVignette={true}
                 outerVignette={false}
                 smooth={true}
               />
            </div>
            <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6 animate-pulse border border-[#d4af37]/30 shadow-[0_0_30px_#d4af37]/20">
                <Brain className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Link Strategic Intelligence</h2>
              <p className="text-slate-400 max-w-md mb-8">
                Connect your personal AI models to synchronize narrative growth with local strategic overrides.
              </p>
              <div className="flex gap-4">
                {!connectionStatus.isLinked ? (
                  <button 
                    onClick={handleLinkAccount}
                    disabled={connectionStatus.isLinking}
                    className="px-6 py-3 bg-[#d4af37] text-black font-bold rounded-lg hover:shadow-[0_0_20px_#d4af37] transition-all cursor-target disabled:opacity-50 flex items-center gap-2"
                  >
                    {connectionStatus.isLinking ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Synchronizing...
                      </>
                    ) : (
                      'Authorize API Key'
                    )}
                  </button>
                ) : (
                  <div className="px-6 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Neural Link Verified
                  </div>
                )}
                <button className="px-6 py-3 dark:bg-white/5 bg-white border border-slate-200 dark:border-white/10 rounded-lg hover:border-[#d4af37] transition-all cursor-target">
                  Documentation
                </button>
              </div>
            </div>
          </div>  

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dark:bg-black bg-slate-50 p-6 rounded-xl border border-slate-200 dark:border-white/5">
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Lock className="w-4 h-4 text-[#d4af37]" /> Encryption Layer
               </h3>
               <p className="text-sm dark:text-slate-400 text-slate-500 mb-4">Secure all outbound X communications with RSA-4096 narrative wrapping.</p>
               <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5">
                  <span className="text-xs font-mono text-[#d4af37]">STATUS: SECURE</span>
                  <div className="w-10 h-5 bg-[#d4af37] rounded-full flex items-center px-1">
                    <div className="w-3 h-3 bg-black rounded-full ml-auto" />
                  </div>
               </div>
            </div>
            <div className="dark:bg-black bg-slate-50 p-6 rounded-xl border border-slate-200 dark:border-white/5">
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-[#d4af37]" /> Pulse Sync
               </h3>
               <p className="text-sm dark:text-slate-400 text-slate-500 mb-4">Synchronize local cache with global X trend surges every 15 seconds.</p>
               <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5">
                  <span className="text-xs font-mono text-[#d4af37]">INTERVAL: 15s</span>
                  <div className="w-10 h-5 bg-white/10 rounded-full flex items-center px-1">
                    <div className="w-3 h-3 bg-slate-400 rounded-full" />
                  </div>
               </div>
            </div>
          </div>
        </div>  
      )}  
        {/* Header Section */}  
        <div className="p-8 max-w-6xl mx-auto">  
          <div className="flex justify-between items-end mb-8">  
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="md:hidden p-2 dark:bg-white/5 bg-slate-100 rounded-lg hover:bg-[#d4af37]/20 transition-colors"
               >
                <Menu className="w-6 h-6 dark:text-white text-black" />
              </button>
              <div>  
                <h1 className="text-3xl font-bold dark:text-white text-black mb-2 tracking-tight">  
                <BlurText 
                  text={
                    activeTab === 'warroom' ? 'Strategic War Room' :
                    activeTab === 'intelligence' ? 'Bio Alignment Intelligence' :
                    activeTab === 'fingerprint' ? 'Lexical DNA & Voice' :
                    'Narrative Hijack Radar'
                  }
                  delay={100}
                  animateBy="words"
                  direction="top"
                />
              </h1> 
              <p className="dark:text-slate-400 text-slate-500 font-medium h-6 flex items-center" ref={containerRef}>  
                <VariableProximity
                  label="Strategic analysis active for @johndoe"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                  className="variable-proximity-demo cursor-pointer"
                />
              </p>  
            </div>  
            </div>
            <div className="dark:bg-[#d4af37]/10 bg-[#d4af37]/5 border border-[#d4af37]/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl dark:shadow-black/50 transition-all">  
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold tracking-tighter">
                Secure Session
              </span>
            </div>
            <div className="flex flex-col items-center mb-10 logo-hover-trigger group cursor-pointer">
              <CreatorSignalLogo className="w-24 h-24 mb-4" animate={true} />
              <h2 className="text-5xl font-black dark:text-white text-black tracking-tighter flex items-center gap-3">
                X<span className="text-slate-300 dark:text-white/10 uppercase">/</span><span className="text-[#d4af37]">INTELLIGENCE</span>
              </h2>  
              <p className="dark:text-white/40 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">  
                <DecryptedText 
                  text="The Future of Autonomous Networks" 
                  animateOn="view" 
                  revealDirection="center"
                  speed={50}
                />
              </p>  
            </div>  
          </div>  
  
          {activeTab === 'warroom' && (  
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">  
              {isRescuing && (  
                <div className="bg-[#d4af37]/5 border border-[#d4af37]/30 rounded-2xl p-6 flex items-start gap-5 animate-in slide-in-from-top-4 duration-500 backdrop-blur-sm">  
                  <div className="bg-[#d4af37] p-3 rounded-xl shadow-lg shadow-[#d4af37]/20">  
                    <AlertTriangle className="text-black w-6 h-6" />  
                  </div>  
                  <div className="flex-1">  
                    <div className="flex justify-between items-center mb-1">  
                      <h3 className="text-lg font-bold dark:text-white text-black uppercase tracking-tight">Post Rescue Protocol Required</h3>  
                      <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded-full font-black uppercase">12m since post</span>  
                    </div>  
                    <p className="dark:text-slate-300 text-slate-600 mb-4 font-medium leading-relaxed">  
                      Your current post is stalling at <span className="dark:text-white text-black font-bold">1,400 impressions</span>. Bookmark velocity is high, but reply depth is zero. The algorithm is cooling off.  
                    </p>  
                    <div className="flex gap-3">  
                      <button className="bg-[#d4af37] hover:bg-[#c4a030] text-black px-4 py-2 rounded-lg text-sm font-black flex items-center gap-2 transition-all shadow-lg shadow-[#d4af37]/10 uppercase tracking-tighter">  
                        <MessageSquare className="w-4 h-4" />  
                        Deploy Rescue Reply  
                      </button>  
                      <button onClick={() => setIsRescuing(false)} className="bg-slate-100 dark:bg-white/5 hover:opacity-80 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-lg text-sm font-bold transition-all border border-slate-200 dark:border-white/10">  
                        Ignore  
                      </button>  
                    </div>  
                  </div>  
                </div>  
              )}  
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-lg hover:border-[#d4af37]/30 transition-all duration-300">  
                  <div className="flex items-center gap-3 mb-4">  
                    <GrowthScale className="w-5 h-5 text-[#d4af37]" />  
                    <h3 className="font-bold text-slate-400 dark:text-white/40 uppercase text-xs tracking-widest">Growth Velocity</h3>  
                  </div>  
                  <div className="text-4xl font-black dark:text-white text-black font-mono tracking-tighter">
                    {dashboardStats.isLoading ? '...' : `+${dashboardStats.growthVelocity}%`}
                  </div>  
                  <div className="text-emerald-500 dark:text-emerald-400 text-sm mt-2 flex items-center gap-1 font-bold">  
                    <ArrowUpRight className="w-4 h-4" /> {dashboardStats.followerDelta || 'Analyzing...'}  
                  </div>  
                </div>  
                 
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-lg hover:border-[#d4af37]/30 transition-all duration-300">  
                  <div className="flex items-center gap-3 mb-4">  
                    <VerifiedAI className="w-5 h-5 text-[#d4af37]" />  
                    <h3 className="font-bold text-slate-400 dark:text-white/40 uppercase text-xs tracking-widest">Viral Probability</h3>  
                  </div>  
                  <div className="text-4xl font-black dark:text-white text-black font-mono tracking-tighter">
                    {dashboardStats.isLoading ? '...' : `${dashboardStats.viralProbability}%`}
                  </div>  
                  <div className="text-[#d4af37] text-sm mt-2 font-bold font-mono">
                    Next window: {dashboardStats.nextWindow || 'Calculating...'}
                  </div>  
                </div>  
  
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-lg hover:border-[#d4af37]/30 transition-all duration-300">  
                  <div className="flex items-center gap-3 mb-4">  
                    <TrendingUp className="text-[#d4af37] w-5 h-5" />  
                    <h3 className="font-bold text-slate-400 dark:text-white/40 uppercase text-xs tracking-widest">Dwell Time Avg</h3>  
                  </div>  
                  <div className="text-4xl font-black dark:text-white text-black font-mono tracking-tighter">
                    {dashboardStats.isLoading ? '...' : `${dashboardStats.dwellTime}s`}
                  </div>  
                  <div className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 font-bold uppercase tracking-tighter">
                    {dashboardStats.dwellRank || 'Rank pending...'}
                  </div>  
                </div>  
              </div>  
  
              <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">  
                <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex justify-between items-center px-6">  
                  <div className="flex items-center gap-2">
                    <VisionSensor className="w-4 h-4" />
                    <span className="text-xs font-bold dark:text-slate-400 text-slate-600 uppercase tracking-widest">Live Post Monitor</span>  
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[10px] dark:text-slate-500 text-slate-500 font-bold uppercase">  
                    <span>Likes: {recentPost.likes}</span>  
                    <span>Views: {recentPost.impressions}</span>  
                  </div>  
                </div>  
                <div className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-black">  
                  <p className="text-xl italic dark:text-slate-100 text-slate-800 font-serif leading-relaxed">"{recentPost.text}"</p>  
                </div>  
              </div>  
            </motion.div>  
          )}  
  
          {activeTab === 'intelligence' && (  
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">  
              <div className="space-y-6">  
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl hover:border-[#d4af37]/30 transition-all">  
                  <h3 className="text-xl font-bold dark:text-white text-black mb-6 uppercase tracking-tight flex items-center gap-3">
                    <DataNode className="w-6 h-6 text-[#d4af37]" />
                    Conversion Diagnostics
                  </h3>  
                  <div className="space-y-4">  
                    <div className="flex justify-between items-end border-b border-slate-200 dark:border-white/5 pb-4">  
                      <span className="dark:text-slate-400 text-slate-600 text-sm font-medium uppercase tracking-wider">Profile Visits (24h)</span>  
                      <span className="text-2xl font-black dark:text-white text-black font-mono">{MOCK_BIO_ALIGNMENT.profileVisits24h}</span>  
                    </div>  
                    <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">  
                      <span className="dark:text-slate-400 text-slate-600 text-sm font-medium uppercase tracking-wider">Follower Conversion Rate</span>  
                      <span className="text-2xl font-black text-rose-500 font-mono">{ (MOCK_BIO_ALIGNMENT.followerConversionRate * 100).toFixed(1) }%</span>  
                    </div>  
                  </div>  
                   
                  <div className="mt-8 p-6 bg-rose-500/5 border border-rose-500/20 rounded-xl">  
                    <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 mb-3">  
                      <ShieldSafety className="w-4 h-4" />  
                      <span className="font-black text-xs uppercase tracking-widest">Alignment Mismatch</span>  
                    </div>  
                    <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed font-medium">  
                      {MOCK_BIO_ALIGNMENT.mismatchReason}  
                    </p>  
                  </div>  
                </div>  
              </div>  
  
              <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl flex flex-col justify-between">  
                <div>
                  <h3 className="text-xl font-bold dark:text-white text-black mb-6 uppercase tracking-tight flex items-center gap-3">
                    <SparkleGenAI className="w-6 h-6 text-[#d4af37]" />
                    Suggested Transformation
                  </h3>  
                  <div className="bg-white dark:bg-black p-8 rounded-xl border border-slate-200 dark:border-white/5 mb-8 font-serif text-lg text-[#d4af37] italic shadow-inner">  
                    "{MOCK_BIO_ALIGNMENT.suggestedBio}"  
                  </div>  
                </div>
                <button 
                  onClick={handleApplyBio}
                  disabled={isApplyingBio}
                  className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-tight shadow-lg shadow-[#d4af37]/10 disabled:opacity-50"
                >  
                  {isApplyingBio ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Rewriting Bio DNA...
                    </>
                  ) : (
                    <>
                      Apply New Bio Strategy  
                      <ArrowUpRight className="w-5 h-5" />
                    </>
                  )}
                </button>  
              </div>  
            </motion.div>  
          )}  
  
          {activeTab === 'fingerprint' && (  
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">  
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl text-center">  
                  <div className="flex items-center justify-center gap-4 mb-8">  
                    <div className="bg-[#d4af37]/10 p-2 rounded-lg">
                      <FingerprintIcon className="text-[#d4af37] w-8 h-8" />  
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white text-black tracking-tight uppercase">Lexical DNA Profile</h3>  
                  </div>  
                  <div className="grid grid-cols-2 gap-6">  
                    {[  
                      { label: "Sentence Variance", value: isHardening ? "Analyzing..." : lexicalDNA?.sentence_variance },  
                      { label: "Vocabulary Density", value: isHardening ? "..." : `${(lexicalDNA?.vocabulary_density * 100).toFixed(0)}%` },  
                      { label: "Archetype", value: isHardening ? "..." : lexicalDNA?.style_archetype.split('/')[0] },  
                      { label: "Resonance", value: isHardening ? "..." : `${lexicalDNA?.emotional_resonance}%` },  
                    ].map((stat, i) => (  
                      <div key={i} className="bg-white dark:bg-black p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-xl">  
                        <div className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-black tracking-widest mb-2">{stat.label}</div>  
                        <div className="dark:text-white text-black text-lg font-black">{stat.value}</div>  
                      </div>  
                    ))}  
                  </div>  
                </div>  
  
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl flex flex-col gap-8">  
                  <div>
                    <h3 className="text-lg font-bold dark:text-white text-black mb-4 uppercase tracking-widest flex items-center gap-2">
                       <ShieldSafety className="w-4 h-4 text-[#d4af37]" />
                       Dominant Narratives
                    </h3>  
                    <div className="flex flex-wrap gap-2">  
                      {isHardening ? (
                         <div className="w-full h-8 bg-white/5 animate-pulse rounded-full"></div>
                      ) : lexicalDNA?.top_narratives.map((tag, i) => (  
                        <span key={i} className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter">  
                          {tag}  
                        </span>  
                      ))}  
                    </div>  
                  </div>
                  <div>
                    <h3 className="text-lg font-bold dark:text-white text-black mb-4 uppercase tracking-widest flex items-center gap-2">
                       <VerifiedAI className="w-4 h-4 text-emerald-500" />
                       Strategic Adjustments
                    </h3>  
                    <div className="space-y-2">  
                      {isHardening ? (
                        <div className="space-y-2">
                          <div className="h-6 bg-white/5 animate-pulse rounded w-full"></div>
                          <div className="h-6 bg-white/5 animate-pulse rounded w-3/4"></div>
                        </div>
                      ) : lexicalDNA?.suggested_shifts.map((shift, i) => (  
                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                          {shift}
                        </div>
                      ))}  
                    </div>  
                  </div>
                </div>  
              </div>

              {/* Enterprise Audit Log Section */}
              <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl">
                <h3 className="dark:text-white text-black text-xl font-bold mb-6 flex items-center gap-3">
                  <Lock className="text-[#d4af37] w-6 h-6" />
                  Enterprise Operational Audit
                </h3>
                <div className="space-y-4 font-mono text-[10px]">
                  {isHardening ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-white/5 w-full rounded"></div>
                      <div className="h-4 bg-white/5 w-full rounded"></div>
                    </div>
                  ) : auditLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-slate-400 border-b border-white/5 pb-2">
                      <span className="text-[#d4af37] shrink-0">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
                      <span className="dark:text-white text-black font-bold uppercase">{log.action}</span>
                      <span className="ml-auto opacity-50">BY: {log.user}</span>
                    </div>
                  ))}
                  {auditLogs.length === 0 && !isHardening && (
                    <div className="text-slate-500 italic">No operational logs detected in the current session.</div>
                  )}
                </div>
              </div>
            </motion.div>  
          )}  
  
          {activeTab === 'hijack' && (  
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">  
              <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 p-8 rounded-2xl flex items-center justify-between backdrop-blur-md">  
                <div className="flex items-center gap-6">  
                  <div className="bg-[#d4af37] p-3 rounded-2xl shadow-xl shadow-[#d4af37]/20">  
                    <TargetIcon className="text-black w-8 h-8" />  
                  </div>  
                  <div>  
                    <h3 className="dark:text-white text-black text-xl font-bold uppercase tracking-tight">Market Opportunity Detected</h3>  
                    <p className="text-[#d4af37] text-sm font-black opacity-90">Scanning live competitor sentiment for elite high-ratio opportunities.</p>  
                  </div>  
                </div>  
                <div className={`text-xs font-mono text-[#d4af37] font-black uppercase whitespace-nowrap hidden md:block ${isScanningCompetitors ? 'animate-pulse' : ''}`}>
                  {isScanningCompetitors ? 'Scanning live sentiments...' : 'Radar Online / Signals Locked'}
                </div>  
              </div>  
  
              {competitors.map(target => (  
                <div key={target.id} className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl relative overflow-hidden group">  
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CreatorSignalLogo className="w-32 h-32" />
                  </div>
                  <div className="flex justify-between items-start mb-8 relative z-10">  
                    <div className="flex items-center gap-4">  
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-black border-2 border-slate-200 dark:border-white/10 flex items-center justify-center font-black dark:text-white text-slate-800 text-lg shadow-xl">  
                        {target.handle[1].toUpperCase()}  
                      </div>  
                      <div>  
                        <div className="dark:text-white text-slate-800 font-black text-lg">{target.handle}</div>  
                        <div className="text-[10px] text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em]">Ratio: {target.ratio}x Critical</div>  
                      </div>  
                    </div>  
                    <div className="text-xs font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-slate-400 capitalize flex items-center gap-2">
                      {target.sentiment === 'Negative' && <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]" />}
                      {target.sentiment === 'Positive' && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />}
                      {target.sentiment === 'Neutral' && <div className="w-2 h-2 rounded-full bg-slate-400" />}
                      {target.sentiment === 'Controversial' && <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]" />}
                      Sentiment: {target.sentiment}
                    </div>
                  </div>  
                  <blockquote className="border-l-4 border-[#d4af37]/50 pl-8 mb-10 dark:text-slate-300 text-slate-700 italic text-xl font-serif leading-relaxed relative z-10">  
                    "{target.text}"  
                  </blockquote>  
                  <div className="bg-white/40 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-8 rounded-2xl relative z-10 backdrop-blur-sm">  
                    <h4 className="text-[#d4af37] font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">  
                      <NeuralLink className="w-4 h-4" />  
                      Counter-Strike Logic  
                    </h4>  
                    <p className="dark:text-white text-slate-900 font-bold text-lg mb-8 leading-snug">{target.opportunity}</p>  
                    <button 
                      onClick={() => handleGenerateDraft(target.id)}
                      disabled={generatingDraftFor !== null}
                      className="bg-black dark:bg-[#d4af37] text-white dark:text-black font-black px-8 py-4 rounded-xl text-sm hover:opacity-80 transition-all flex items-center gap-2 uppercase tracking-tight shadow-xl disabled:opacity-50"
                    >  
                      {generatingDraftFor === target.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Analyzing Weaknesses...
                        </>
                      ) : (
                        <>
                          Generate Refutation Draft  
                          <RefreshCw className="w-4 h-4" />
                        </>
                      )}
                    </button>  
                  </div>  
                </div>  
              ))}  
            </motion.div>  
          )}  
  
        </div>  
        <GradualBlur 
          position="bottom"
          height="4rem"
          strength={1.5}
          divCount={8}
          curve="bezier"
        />
      </main>  
    </div>  
  );  
}
