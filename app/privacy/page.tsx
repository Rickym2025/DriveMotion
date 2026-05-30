"use client";

import React from "react";
import { ArrowLeft, Sparkles, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans py-20 px-6 relative overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto bg-[#0a0a0c]/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <a
            href="/"
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </a>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
              <Sparkles size={12} /> Trasparenza RM Studio
            </div>
            <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight">
              Privacy Policy
            </h1>
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-8 font-mono">
          Ultimo aggiornamento: Maggio 2026
        </p>

        {/* Box Trust Automotive */}
        <div className="mb-10 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-start gap-4">
          <Eye className="text-cyan-400 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-white mb-1">🚗 Sostituzione Sfondi e Trattamento Immagini</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              DriveMotion AI elabora le immagini dei veicoli caricate dal piazzale esclusivamente al fine di rimuovere lo sfondo originale e applicare l&apos;ambiente magico 3D selezionato. Le immagini e le targhe presenti non vengono catalogate o utilizzate per addestramenti commerciali esterni.
            </p>
          </div>
        </div>

        <section className="space-y-8 text-slate-300 leading-relaxed text-base">
          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 1. Titolare del Trattamento
            </h2>
            <p className="text-slate-400">
              Il Titolare del trattamento dei dati è <strong>RM Studio di Riccardo Modena</strong> (Sito: <a href="https://rmstudio.app/" className="text-cyan-400 underline hover:text-cyan-300">https://rmstudio.app/</a>). Qualsiasi richiesta inerente alla privacy o alla rimozione di log di elaborazione può essere indirizzata al Titolare attraverso l&apos;interfaccia di supporto dell&apos;applicazione.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 2. Dati Raccolti all&apos;interno del Tool
            </h2>
            <p className="text-slate-400">
              DriveMotion AI raccoglie ed elabora:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-400">
              <li><strong>Informazioni dell&apos;Autosalone:</strong> Nome del concessionario, indirizzo dell&apos;esposizione, numero di telefono e logo aziendale (per la firma digitale del video).</li>
              <li><strong>Specifiche Tecniche del Veicolo:</strong> Marca, modello, anno di immatricolazione, allestimento e prezzo dell&apos;auto.</li>
              <li><strong>File Multimediali:</strong> Fino a un massimo di 8 fotografie del veicolo per ciascuna elaborazione.</li>
              <li><strong>Email dell&apos;operatore:</strong> Indirizzo email necessario per la spedizione asincrona dei media pronti all&apos;uso.</li>
              <li><strong>Stripe Payment Data:</strong> Informazioni transazionali basate sul parametro sicuro <code className="text-xs bg-white/5 px-2 py-1 rounded">client_reference_id</code> gestite da Stripe.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 3. Finalità dell&apos;Elaborazione
            </h2>
            <p className="text-slate-400">
              Tutti i dati vengono utilizzati esclusivamente per creare il video promozionale cinematico HD, sostituire gli sfondi tramite AI Generativa, abbinare la sintesi vocale multilingua selezionata, scalare i crediti dal portafoglio Stripe ed inviare l&apos;output finito via email in modo automatizzato.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 4. Infrastruttura e Destinatari Esterni
            </h2>
            <p className="text-slate-400 font-light">
              Per far funzionare il render e i calcoli complessi a basso tempo di latenza, l&apos;applicazione invia i payload ai seguenti servizi in conformità con la normativa europea sul trattamento dei dati:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-400 font-light">
              <li><strong>Hetzner Online GmbH:</strong> Host dell&apos;infrastruttura n8n attiva sul territorio UE.</li>
              <li><strong>Vercel & Supabase:</strong> Server di hosting e database protetti per l&apos;erogazione del codice.</li>
              <li><strong>Stripe:</strong> Partner per tutti i servizi di cassa, fatturazione e acquisto crediti una tantum.</li>
              <li><strong>Web3Forms:</strong> Gateway per la ricezione delle richieste dirette di supporto commerciale.</li>
              <li><strong>OpenAI & ElevenLabs:</strong> Modelli matematici per la sintesi vocale e la scrittura del copywriting automobilistico.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 5. Conservazione e Diritti
            </h2>
            <p className="text-slate-400">
              Nessun abbonamento mensile è richiesto. I tuoi crediti di elaborazione rimarranno nel tuo account a tempo indeterminato. Puoi richiedere la correzione, l&apos;accesso storico o la rimozione immediata dei tuoi dati di vendita registrati in qualunque momento tramite il form di supporto integrato in app.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <a href="/" className="text-cyan-400 hover:text-white font-bold text-sm flex items-center justify-center gap-2">
            ← Ritorna alla Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
