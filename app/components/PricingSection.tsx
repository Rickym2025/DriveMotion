import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { avviaCheckoutDriveMotion } from "../utils/stripe";

interface PricingProps {
  email?: string;
}

export default function PricingSection({ email }: PricingProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planKey: "starter" | "pro" | "max") => {
    try {
      setLoadingPlan(planKey);
      await avviaCheckoutDriveMotion(planKey, email);
    } catch (err) {
      console.error(err);
      window.location.hash = "#prezzi";
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="prezzi" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
          🚀 Offerta Speciale di Lancio
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Investi sul tuo Marketing, <br/><span className="text-cyan-400">non sui costi fissi.</span></h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Sistema Pay-per-Result: acquisti i crediti una volta, li usi quando vuoi. <br className="hidden md:block"/> 
          <strong>Senza abbonamenti. Senza scadenze.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        {/* Starter */}
        <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-all justify-between">
          <div>
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Starter Pack</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-slate-500 line-through text-lg">€29</span>
              <div className="text-4xl font-black text-white">€ 14,90</div>
            </div>
            <p className="text-cyan-500/80 text-xs font-bold mb-6">Il prezzo di una pizza per vendere un&apos;auto.</p>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> 1 Video HD Professionale</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Sfondo AI Personalizzato</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Post Social Pronti all&apos;uso</li>
            </ul>
          </div>
          <button 
            onClick={() => handleCheckout("starter")} 
            disabled={loadingPlan === "starter"}
            className="block text-center w-full border border-white/20 hover:bg-white/10 py-3.5 rounded-full font-bold transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loadingPlan === "starter" ? "Apertura Checkout..." : "Inizia Ora"}
          </button>
        </div>

        {/* Pro */}
        <div className="bg-gradient-to-b from-cyan-900/40 to-[#0a0a0c]/90 backdrop-blur-xl border-2 rounded-[2rem] p-8 flex flex-col relative transform md:-translate-y-4 z-10 scale-105 justify-between gold-decoy-card">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">SCELTO DAL 74% DEI SALONI</div>
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Pro Pack (5 Video)</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-slate-400 line-through text-lg">€99</span>
              <div className="text-5xl font-black text-white">€ 59</div>
            </div>
            <p className="text-white text-xs font-bold mb-6">Solo 11,80€ per video cinematografico.</p>
            <ul className="space-y-4 text-sm text-white mb-8">
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> <strong>5 Video Credits</strong></li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> <strong>Il Tuo Logo nel Video</strong></li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Lingue Straniere Sbloccate</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Crediti Senza Scadenza</li>
            </ul>
          </div>
          <button 
            onClick={() => handleCheckout("pro")} 
            disabled={loadingPlan === "pro"}
            className="block text-center w-full bg-cyan-500 text-black hover:bg-cyan-400 py-4 rounded-full font-black transition-all shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
          >
            {loadingPlan === "pro" ? "Apertura Checkout..." : "ACQUISTA 5 VIDEO 🔥"}
          </button>
        </div>

        {/* Maxi */}
        <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-all group justify-between">
          <div>
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Maxi Pack (15 Video)</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-slate-500 line-through text-lg">€199</span>
              <div className="text-4xl font-black text-white">€ 129</div>
            </div>
            <p className="text-cyan-500/80 text-xs font-bold mb-6">Il miglior rapporto qualità/prezzo.</p>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> <strong>15 Video Credits HD</strong></li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Inserimento Logo Salone</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Elaborazione Prioritaria</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Tutte le funzioni Pro</li>
            </ul>
          </div>
          <button 
            onClick={() => handleCheckout("max")} 
            disabled={loadingPlan === "max"}
            className="block text-center w-full border border-white/20 hover:bg-white/10 py-3.5 rounded-full font-bold transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loadingPlan === "max" ? "Apertura Checkout..." : "Sblocca 15 Video"}
          </button>
        </div>
      </div>
      <p className="text-center text-slate-500 text-xs mt-12 italic">Tutti i prezzi sono una tantum. I crediti acquistati non scadono mai e rimangono nel tuo account finché non li usi.</p>
    </section>
  );
}
