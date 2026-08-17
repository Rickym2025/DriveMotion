import React from "react";
import { MessageSquare } from "lucide-react";

interface NavbarProps {
  isPro: boolean;
  videoRimanenti: number;
  onOpenSupport: () => void;
}

export default function Navbar({ isPro, videoRimanenti, onOpenSupport }: NavbarProps) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="DriveMotion Logo" 
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-extrabold text-white tracking-tight text-lg hidden sm:inline">
            DriveMotion <span className="text-cyan-400 font-serif italic text-sm">AI</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
          <span className="text-slate-500 font-semibold px-2">Ecosistema RM Studio:</span>
          <a href="https://hometour.rmstudio.app/" target="_blank" className="text-slate-400 hover:text-cyan-400 px-2.5 py-1 rounded-full hover:bg-white/5 transition-all">HomeTour AI</a>
          <a href="https://concierge24.rmstudio.app/" target="_blank" className="text-slate-400 hover:text-cyan-400 px-2.5 py-1 rounded-full hover:bg-white/5 transition-all">Concierge24</a>
          <a href="https://omniastudio.rmstudio.app/" target="_blank" className="text-slate-400 hover:text-cyan-400 px-2.5 py-1 rounded-full hover:bg-white/5 transition-all">OmniaStudio</a>
        </div>

        <div className="flex items-center gap-4">
          {isPro && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{videoRimanenti} Crediti</span>
            </div>
          )}
          <a href="https://blogs.rmstudio.app/drivemotion/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-400 hover:text-white transition-colors hidden sm:block">Blog</a>
          <button onClick={onOpenSupport} className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer">
            <MessageSquare size={14} /> Contatti
          </button>
        </div>
      </div>
    </nav>
  );
}
