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
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="max-w-xs flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <img src="/logo.png" alt="DriveMotion AI Logo" className="h-24 w-auto object-contain bg-white rounded-lg px-3 py-1.5 shadow-sm" />
          </div>
          <p className="text-slate-500 text-sm leading-relaxed text-center md:text-left">
            Tecnologia proprietaria RM Studio. Semplifichiamo il marketing automotive attraverso l&apos;Intelligenza Artificiale Generativa.
          </p>
          <div className="text-slate-600 text-xs mt-6 flex flex-col sm:flex-row items-center gap-2 justify-center md:justify-start">
            <span>© {new Date().getFullYear()} RM Studio. Tutti i diritti riservati.</span>
            <span className="hidden sm:inline text-slate-800">|</span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors underline">
              Privacy Policy
            </a>
            <span className="hidden sm:inline text-slate-800">|</span>
            <a href="https://blogs.rmstudio.app/drivemotion/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors underline font-bold">
              Blog DriveMotion
            </a>
            <span className="hidden sm:inline text-slate-800">|</span>
            <a href="https://rmstudio.app/termini.html" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors underline">
              Termini e Condizioni
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Social Hub</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/riccardo_mode_/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"><InstagramIcon size={20} /></a>
            <a href="https://www.facebook.com/riccardo.modena.792" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"><FacebookIcon size={20} /></a>
            <a href="https://www.linkedin.com/in/riccardo-modena-13918a61/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600/50 hover:bg-blue-600/10 transition-all"><LinkedinIcon size={20} /></a>
            <a href="https://www.tiktok.com/@mr3d.riccardo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"><TiktokIcon size={20} /></a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Contattaci</h4>
          <button onClick={onOpenSupport} className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">
            Invia un messaggio
          </button>
        </div>
      </div>
    </footer>
  );
}
