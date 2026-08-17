import React from "react";
import { Car, Camera, Scan, Play } from "lucide-react";

interface HeroProps {
  demoStep: number;
}

export default function Hero({ demoStep }: HeroProps) {
  return (
    <header className="max-w-7xl mx-auto px-6 pt-12 pb-16 flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">
      <div className="flex-1 text-center lg:text-left z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
          <Car size={14} className="text-cyan-400" /> Cinema AI per Autosaloni
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1] drop-shadow-lg">
          Vendi più Auto. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Con l&apos;Intelligenza Artificiale.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
          Carica da 3 a 8 foto dal piazzale. La nostra AI elimina lo sfondo amatoriale, posiziona l&apos;auto in showroom da sogno e crea un Reel d&apos;impatto con regia dinamica e voce persuasiva.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center lg:justify-start pt-2">
          <a 
            href="#creatore" 
            className="bg-white text-black font-extrabold rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] text-lg px-10 py-5 w-full sm:w-auto"
          >
            <Play size={20} fill="currentColor" /> Genera 1° Video Gratis
          </a>
          
          <a 
            href="#prezzi" 
            className="bg-black/50 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold hover:bg-white/20 backdrop-blur-md text-sm text-center w-full sm:w-auto self-center"
          >
            Vedi i Pacchetti
          </a>
        </div>
      </div>

      {/* PHONE MOCKUP ANIMATO */}
      <div className="flex-1 w-full max-w-[320px] relative">
        <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full animate-pulse" />
        <div className="relative border-[6px] border-[#1a1a1a] bg-[#050505] rounded-[3rem] overflow-hidden aspect-[9/19] shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-7 bg-[#1a1a1a] rounded-b-3xl w-1/2 mx-auto z-50" />

          <div className={`absolute inset-0 transition-opacity duration-1000 ${demoStep === 0 ? "opacity-100" : "opacity-0"}`}>
            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-75" alt="Parking" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-2 flex items-center gap-2 shadow-lg">
                <Camera size={16} /> 1. Scatto Piazzale
              </div>
            </div>
          </div>

          <div className={`absolute inset-0 transition-opacity duration-1000 bg-[#0a0a0c] flex items-center justify-center flex-col ${demoStep === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <Scan size={64} className="text-cyan-400 mb-6 animate-pulse" />
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2 text-center">Rielaborazione AI 3D...</h3>
          </div>

          <div className={`absolute inset-0 transition-opacity duration-1000 bg-black ${demoStep === 2 ? "opacity-100 z-20" : "opacity-0 z-0"}`}>
            <img src="https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Showroom" />
            <div className="absolute bottom-12 left-6 right-16 z-30">
              <div className="bg-cyan-500 text-black text-xs font-black px-3 py-1 inline-block uppercase -skew-x-12 mb-2 shadow-lg">Pronta Consegna</div>
              <h3 className="text-white font-black text-xl uppercase mb-1 drop-shadow-md">Audi RS6</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
