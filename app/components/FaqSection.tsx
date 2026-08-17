import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FaqSectionProps {
  faqs: { q: string; a: string }[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
          <HelpCircle size={14} /> Dubbi Frequenti
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Tutto quello che c&apos;è da sapere
        </h2>
        <p className="text-slate-400 mt-3 text-base">Risposte chiare e trasparenti prima di iniziare.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div 
              key={idx} 
              className="bg-[#0a0a0c]/90 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
              >
                <span className="font-bold text-white text-base sm:text-lg">{faq.q}</span>
                <ChevronDown className={`text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={20} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
