import React, { RefObject } from "react";

interface EcosystemProps {
  orbitContainerRef: RefObject<HTMLDivElement | null>;
}

export default function EcosystemSection({ orbitContainerRef }: EcosystemProps) {
  return (
    <>
      <section id="ecosistema" className="border-t border-white/10 bg-[#020202]/80 py-24 px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div 
            ref={orbitContainerRef}
            className="w-full lg:w-1/2 flex justify-center items-center relative min-h-[440px] orbit-area"
            id="orbit-template-container"
          />
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              Esperienza & Autorevolezza
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter text-white">
              Non ti vendo software.<br />
              <span className="text-cyan-400">Ti costruisco un vantaggio.</span>
            </h2>
            <p className="text-white/60 mb-6 leading-relaxed text-lg font-light italic">
              &ldquo;Prendo i tuoi colli di bottiglia e li trasformo in ecosistemi autonomi che producono media,
              gestiscono clienti e generano vendite H24.&rdquo;
            </p>
            <p className="text-lg text-white/40 mb-8 leading-relaxed font-light">
              Sono Riccardo Modena, founder di <b>RM Studio</b>. Ho fondato questo lab perché oggi l&apos;AI non è più
              un lusso, è l&apos;unico modo per scalare senza un esercito di dipendenti. Come evidenziato nelle <a href="https://www.w3.org/community/tourism/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">linee guida del consorzio internazionale W3C sull&apos;IA applicata al turismo</a>, l&apos;integrazione di sistemi conversazionali intelligenti abbatte la frizione operativa e ottimizza l&apos;esperienza d&apos;uso dell&apos;utente finale.
            </p>
            <a href="#creatore" className="inline-flex items-center gap-2 border-b-2 border-cyan-400 text-cyan-400 pb-1 font-black uppercase text-sm tracking-widest hover:text-white hover:border-white transition-all">
              Esplora le Soluzioni ↓
            </a>
          </div>
        </div>
      </section>

      {/* Autorevolezza E-E-A-T */}
      <section className="bg-slate-950/60 border-y border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 text-sm">
          <p className="text-center md:text-left text-slate-400 font-medium max-w-xl">
            I sistemi di elaborazione e la conformità di DriveMotion aderiscono alle metodologie raccomandate dalle principali organizzazioni di regolamentazione tecnica e di sicurezza dei dati.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-semibold">
            <a href="https://www.nar.realtor" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4">
              National Association of Realtors
            </a>
            <span className="text-slate-800">|</span>
            <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4">
              ISO/IEC 27001 Security Standard
            </a>
            <span className="text-slate-800">|</span>
            <a href="https://www.health.harvard.edu" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4">
              Harvard Health Publishing
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
