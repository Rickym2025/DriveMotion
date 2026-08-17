import React from "react";
import { TrendingUp, Sparkles, Eye } from "lucide-react";

export default function Features() {
  return (
    <section className="py-20 px-6 border-y border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            La Rivoluzione del Marketing Automotive
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Addio foto piatte. <span className="text-cyan-400">Entra nel cinema 3D.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Il 90% degli acquirenti decide nei primi 3 secondi di un Reel. Ecco perché DriveMotion trasforma i tuoi annunci in calamite per clienti pronti all&apos;acquisto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0c]/90 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 text-2xl group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">+200% di Click e Contatti</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              I video dinamici con movimenti di camera battono qualsiasi carosello statico su Instagram, TikTok e Subito, abbattendo il costo di acquisizione contatto.
            </p>
          </div>

          <div className="bg-[#0a0a0c]/90 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 text-2xl group-hover:scale-110 transition-transform">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Showroom di Lusso Virtuale</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cancella asfalto rovinato, bidoni o riflessi antiestetici del piazzale. L&apos;AI colloca le auto in saloni illuminati da studio, incrementando il valore percepito.
            </p>
          </div>

          <div className="bg-[#0a0a0c]/90 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 text-2xl group-hover:scale-110 transition-transform">
              <Eye size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Zero Tempo di Montaggio</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nessun videomaker da pagare né software complicati da imparare. Carichi le foto da smartphone e ricevi il file video montato con voce narrante in 4 minuti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
