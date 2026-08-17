import React from "react";

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TiktokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterProps {
  onOpenSupport: () => void;
}

export default function Footer({ onOpenSupport }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="md:col-span-2">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img src="/logo.png" alt="DriveMotion AI Logo" className="h-10 w-auto object-contain" />
            <span className="font-extrabold text-white text-lg">DriveMotion AI</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Tecnologia proprietaria RM Studio. Semplifichiamo il marketing automotive attraverso l&apos;Intelligenza Artificiale Generativa e la Computer Vision 3D.
          </p>
          <div className="text-slate-600 text-xs mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <span>© {new Date().getFullYear()} RM Studio. Tutti i diritti riservati.</span>
            <span>|</span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="https://rmstudio.app/termini.html" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors underline">
              Termini
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Piattaforme RM</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="https://hometour.rmstudio.app" target="_blank" className="hover:text-cyan-400 transition-colors">HomeTour AI (Immobiliare)</a></li>
            <li><a href="https://concierge24.rmstudio.app" target="_blank" className="hover:text-cyan-400 transition-colors">Concierge24 (Hospitality)</a></li>
            <li><a href="https://dentis.rmstudio.app" target="_blank" className="hover:text-cyan-400 transition-colors">Dentis AI (Dentisti)</a></li>
            <li><a href="https://lexis.rmstudio.app" target="_blank" className="hover:text-cyan-400 transition-colors">Lexis AI (Studi Legali)</a></li>
            <li><a href="https://blogs.rmstudio.app/drivemotion/" target="_blank" className="hover:text-cyan-400 transition-colors font-bold text-cyan-400">Blog DriveMotion</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Social Hub</h4>
          <div className="flex justify-center md:justify-start gap-3 mb-6">
            <a href="https://www.instagram.com/riccardo_mode_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"><InstagramIcon size={18} /></a>
            <a href="https://www.facebook.com/riccardo.modena.792" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"><FacebookIcon size={18} /></a>
            <a href="https://www.linkedin.com/in/riccardo-modena-13918a61/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600/50 hover:bg-blue-600/10 transition-all"><LinkedinIcon size={18} /></a>
            <a href="https://www.tiktok.com/@mr3d.riccardo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"><TiktokIcon size={18} /></a>
          </div>
          <button onClick={onOpenSupport} className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full border border-white/15 transition-all cursor-pointer">
            Scrivi all&apos;Assistenza
          </button>
        </div>
      </div>
    </footer>
  );
}
