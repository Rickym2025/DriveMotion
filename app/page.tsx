import React, { useState } from 'react';

export default function DriveMotionPage() {
  // Stato opzionale per gestire la simulazione di interazione senza alterare le funzioni di base
  const [demoActive, setDemoActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* CSS ISOLATO PER LE ANIMAZIONI DI NEUROSCIENZA (Visual Hook, Pulsazioni e Orbitazione) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbit-rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes counter-rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        @keyframes netflix-glow {
            0%, 100% { transform: scale(1); opacity: 0.4; filter: blur(70px); }
            50% { transform: scale(1.15); opacity: 0.65; filter: blur(95px); }
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.2; }
            50% { transform: scale(1.08); opacity: 0.4; }
            100% { transform: scale(0.95); opacity: 0.2; }
        }
        @keyframes gold-pulse {
            0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.25), inset 0 0 12px rgba(234, 179, 8, 0.1); border-color: rgba(234, 179, 8, 0.3); }
            50% { box-shadow: 0 0 30px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(234, 179, 8, 0.35); border-color: rgba(234, 179, 8, 0.8); }
        }
        
        .orbit-ring {
            position: relative;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.05);
            animation: orbit-rotation 40s linear infinite;
        }
        .orbit-area {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 440px;
        }
        .orbit-area:hover .orbit-ring,
        .orbit-area:hover .orbit-item {
            animation-play-state: paused;
        }
        .orbit-wrapper {
            position: absolute;
            width: 64px;
            height: 64px;
            transform: translate(-50%, -50%);
        }
        .orbit-item {
            position: relative;
            width: 100%;
            height: 100%;
            animation: counter-rotation 40s linear infinite;
            transform-origin: center;
        }
        .orbit-link {
            display: flex;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.1);
            box-sizing: border-box;
            transition: 0.3s;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            text-decoration: none;
        }
        .orbit-link:hover {
            border-color: #06b6d4;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        }
        .orbit-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .orbit-img.cover {
            object-fit: cover;
        }
        .orbit-img.rounded {
            border-radius: 50%;
        }
        .orbit-center-photo {
            position: absolute;
            width: 144px;
            height: 144px;
            border-radius: 50%;
            border: 4px solid #f97316;
            padding: 4px;
            background: #000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
            z-index: 15;
            box-sizing: border-box;
        }
        .orbit-center-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
        .orbit-tooltip {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            background: #0a0a0c;
            border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8;
            font-size: 12px;
            border-radius: 8px;
            padding: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            text-align: center;
            z-index: 50;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            line-height: 1.4;
        }
        .orbit-tooltip b {
            color: white;
            display: block;
            margin-bottom: 4px;
        }
        .orbit-item:hover .orbit-tooltip {
            opacity: 1;
        }
        
        .visual-hook-glow {
            animation: netflix-glow 5s ease-in-out infinite;
        }
        .pulse-ring-element {
            animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .gold-decoy-card {
            animation: gold-pulse 3s infinite ease-in-out;
        }
      ` }} />

      {/* HEADER */}
      <header className="border-b border-white/5 py-5 px-6 md:px-12 backdrop-blur-md bg-black/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black text-sm">DM</div>
            <span className="font-bold tracking-wider text-sm text-slate-200">DRIVEMOTION AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#soluzione" className="hover:text-white transition">La Soluzione</a>
            <a href="#ecosistema" className="hover:text-white transition">Ecosistema RM Studio</a>
            <a href="#prezzi" className="hover:text-white transition">Tariffe</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION - Configurato con Layout a "F" per ridurre la fatica cognitiva */}
      <section id="soluzione" className="relative pt-16 pb-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* REGOLA 3: Il Visual Hook di 3 secondi (Effetto Netflix) */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-blue-600/15 rounded-full pointer-events-none visual-hook-glow z-0" />
        
        {/* PARTE SINISTRA: Proposta di Valore (Inizio del tracciato a F) */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4.5 py-1.5 text-xs text-cyan-400 mb-6 w-fit font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Sfondi e Video Cinematici Automatici per Showroom
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            I tuoi veicoli, inseriti istantaneamente in contesti cinematografici di pregio.
          </h1>

          {/* REGOLA 1: Riduzione della Frizione di Lettura (Testo >= 18px) */}
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
            Sostituisci i piazzali disordinati con sfondi fotorealistici ad alta definizione. DriveMotion AI elabora le immagini statiche dei veicoli trasformandole in video dinamici pronti per la pubblicazione commerciale, riducendo i costi di shooting.
          </p>

          {/* REGOLA 7: Consolidamento Decisionale (CTA Ravvicinate) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            
            {/* REGOLA 2: Dominanza Visiva del Pulsante di Conversione (Dimensione x2) */}
            <a 
              href="#prezzi" 
              className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold tracking-wide rounded-lg transition-transform hover:scale-[1.01] active:scale-[0.99] text-lg md:text-xl px-12 py-6 shadow-[0_0_35px_rgba(6,182,212,0.3)] min-w-[260px]"
            >
              Attiva gratis ora
            </a>

            {/* Pulsante secondario (fisicamente ridotto per marcare la gerarchia visiva) */}
            <button 
              onClick={() => setDemoActive(!demoActive)}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 font-semibold rounded-lg text-sm px-5 py-2.5 transition"
            >
              {demoActive ? 'Nascondi Demo' : 'Vedi Esempio'}
            </button>
          </div>

          {/* REGOLA 5: Associazione Umana e Fiducia (Avatar Assistente) */}
          <div className="flex items-center gap-3.5 border-t border-slate-900/60 pt-6">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs overflow-hidden font-bold text-cyan-400">
                DM_AI
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050507]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Assistente Virtuale DriveMotion</p>
              <p className="text-xs text-slate-500">Pronto ad aiutarti a configurare la tua prima sequenza cinematografica</p>
            </div>
          </div>

        </div>

        {/* PARTE DESTRA: Ecosistema Orbitante RM Studio (6 elementi) */}
        <div id="ecosistema" className="lg:col-span-5 flex justify-center items-center z-10 relative">
          
          <div className="absolute w-[350px] h-[350px] border border-cyan-500/5 rounded-full pulse-ring-element pointer-events-none" />
          <div className="absolute w-[420px] h-[420px] border border-orange-500/5 rounded-full pulse-ring-element pointer-events-none" style={{ animationDelay: '1.5s' }} />

          {/* WIDGET ORBITALE RM STUDIO (6 ELEMENTI SIMMETRICI) */}
          <div className="orbit-container-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto', minHeight: '440px' }}>
            <div className="orbit-area">
              <div className="orbit-ring">
                  
                  {/* 1. Concierge24 (0° - Alto al centro | Sfondo Nero) */}
                  <div className="orbit-wrapper" style={{ top: '0%', left: '50%' }}>
                      <div className="orbit-item">
                          <a href="https://concierge24.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#0a0a0c', padding: '10px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/concierge24pro/main/logo.png" alt="Concierge24" className="orbit-img" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>Concierge24</b>
                              Assistente vocale e testuale AI H24 per hotel e strutture extra-alberghiere.
                          </div>
                      </div>
                  </div>

                  {/* 2. DriveMotion (60° - Alto a destra | Sfondo Bianco) */}
                  <div className="orbit-wrapper" style={{ top: '25%', left: '93.3%' }}>
                      <div className="orbit-item">
                          <a href="https://drivemotion.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#fff', padding: '6px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/logo_drivemotion_bg2.jpg" alt="DriveMotion" className="orbit-img cover rounded" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>DriveMotion AI</b>
                              Generazione automatica di sfondi e video cinematici per saloni auto.
                          </div>
                      </div>
                  </div>

                  {/* 3. Nexus AI (120° - Basso a destra | Sfondo Nero) */}
                  <div className="orbit-wrapper" style={{ top: '75%', left: '93.3%' }}>
                      <div className="orbit-item">
                          <a href="https://nexus.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#0a0a0c', padding: '12px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/nexus/main/logo_nexus.png" alt="Nexus AI" className="orbit-img" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>Nexus AI</b>
                              Widget chatbot intelligente per accoglienza e conversione automatica lead.
                          </div>
                      </div>
                  </div>

                  {/* 4. OmniaStudio (180° - Basso al centro | Sfondo Bianco) */}
                  <div className="orbit-wrapper" style={{ top: '100%', left: '50%' }}>
                      <div className="orbit-item">
                          <a href="https://omniastudio.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#fff', padding: '4px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/logo_OmniaStudio.png" alt="OmniaStudio" className="orbit-img" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>OmniaStudio</b>
                              La potenza dell&apos;AI locale e protetta offline sul tuo PC, a vita.
                          </div>
                      </div>
                  </div>

                  {/* 5. FF Edizioni (240° - Basso a sinistra | Sfondo Nero | Ritratto) */}
                  <div className="orbit-wrapper" style={{ top: '75%', left: '6.7%' }}>
                      <div className="orbit-item">
                          <a href="https://ff-edizioni.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#0a0a0c', padding: '2px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/fausto-fusetti-links/main/logo6.jpg" alt="FF Edizioni" className="orbit-img cover rounded" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>FF Edizioni</b>
                              Colonne sonore, jingle commerciali e sound design creati con l&apos;AI.
                          </div>
                      </div>
                  </div>

                  {/* 6. HomeTour AI (300° - Alto a sinistra | Sfondo Nero) */}
                  <div className="orbit-wrapper" style={{ top: '25%', left: '6.7%' }}>
                      <div className="orbit-item">
                          <a href="https://hometour.rmstudio.app" target="_blank" rel="noopener noreferrer" className="orbit-link" style={{ background: '#0a0a0c', padding: '4px' }}>
                              <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/logo_hometour%2Bbg.jpg" alt="HomeTour" className="orbit-img cover rounded" />
                          </a>
                          <div className="orbit-tooltip">
                              <b>HomeTour AI</b>
                              Reel immobiliari con voce narrante generati in automatico da foto.
                          </div>
                      </div>
                  </div>

              </div>

              {/* REGOLA 5: Associazione Umana - Foto del Fondatore fissa al centro */}
              <div className="orbit-center-photo">
                  <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/riccardo_founder.jpeg" alt="Riccardo Modena - Fondatore RM Studio" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DEMO INTERATTIVA (Esempio Funzionale) */}
      {demoActive && (
        <section className="py-12 bg-slate-900/30 border-y border-white/5 transition-all">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="text-xl font-bold mb-4">Demo Elaborazione DriveMotion</h3>
            <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-8">
              <span className="text-cyan-400 font-mono text-sm animate-pulse mb-2">[ELABORAZIONE IMMAGINE AUTOMOBILE IN CORSO...]</span>
              <p className="text-xs text-slate-500 max-w-md">Estrazione soggetto, ottimizzazione dell&apos;esposizione ed inserimento in contesto stradale cinematico tridimensionale ad alta risoluzione.</p>
            </div>
          </div>
        </section>
      )}

      {/* REGOLA 6: Autorevolezza Scientifica ed E-E-A-T */}
      <section className="bg-slate-950/60 border-y border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 text-sm">
          <p className="text-center md:text-left text-slate-400 font-medium max-w-xl">
            L&apos;architettura di sicurezza e conformità dei modelli generativi utilizzati rispetta gli standard internazionali di certificazione e pubblicazione istituzionale.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-semibold">
            <a 
              href="https://www.nar.realtor" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4"
            >
              National Association of Realtors
            </a>
            <span className="text-slate-800">|</span>
            <a 
              href="https://www.iso.org/standard/27001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4"
            >
              ISO/IEC 27001 Security Standard
            </a>
            <span className="text-slate-800">|</span>
            <a 
              href="https://www.health.harvard.edu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition underline decoration-dotted underline-offset-4"
            >
              Harvard Health Publishing
            </a>
          </div>
        </div>
      </section>

      {/* REGOLA 8: Decoy Pricing (Ancoraggio del Prezzo per DriveMotion) */}
      <section id="prezzi" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Investimento Chiaro, Nessun Costo Nascosto</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Seleziona la frequenza di calcolo più adatta al volume di auto del tuo salone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Opzione 1: Starter (Basso Costo) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between transition-all hover:border-slate-700">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Starter Dealer</span>
              <div className="text-3xl font-bold text-white mb-4">€39<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Ideale per piccoli autosaloni. Fino a 15 sfondi cinematici generati al mese per le schede dei veicoli.
              </p>
              <ul className="space-y-3.5 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">✔ Risoluzione Full HD standard</li>
                <li className="flex items-center gap-2">✔ 15 veicoli elaborabili al mese</li>
                <li className="flex items-center gap-2">✔ Supporto asincrono via ticket</li>
              </ul>
            </div>
            <a href="#attiva" className="w-full py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold text-center transition">
              Scegli Starter
            </a>
          </div>

          {/* Opzione 2: PRO - L&apos;offerta ideale con Ancoraggio e Bagliore Dorato */}
          <div className="relative bg-slate-900 border border-yellow-500/20 rounded-2xl p-8 flex flex-col justify-between gold-decoy-card transform md:-translate-y-4">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
              Valore Ottimale
            </div>
            <div>
              <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider block mb-4">DriveMotion PRO</span>
              <div className="text-4xl font-extrabold text-white mb-4">€89<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Elaborazioni illimitate di sfondi cinematici in 4K e generazione di video-reel automatici con presentatore AI.
              </p>
              <ul className="space-y-3.5 text-slate-200 text-sm mb-8">
                <li className="flex items-center gap-2 text-yellow-500 font-medium">★ Sfondi 4K illimitati</li>
                <li className="flex items-center gap-2">✔ Generazione automatica di Video Reel</li>
                <li className="flex items-center gap-2">✔ Accesso a tutto l&apos;ecosistema RM Studio</li>
                <li className="flex items-center gap-2">✔ Assistenza prioritaria in giornata</li>
              </ul>
            </div>
            <a href="#attiva" className="w-full py-3.5 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold text-center transition shadow-lg shadow-yellow-500/20">
              Sblocca DriveMotion PRO
            </a>
          </div>

          {/* Opzione 3: Maxi (Alto Costo) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between transition-all hover:border-slate-700">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Enterprise Group</span>
              <div className="text-3xl font-bold text-white mb-4">€299<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Sviluppato per grandi gruppi di distribuzione automobilistica o catene di concessionari multibrand.
              </p>
              <ul className="space-y-3.5 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">✔ Integrazione API diretta nei gestionali</li>
                <li className="flex items-center gap-2">✔ Ambienti virtuali 3D proprietari su misura</li>
                <li className="flex items-center gap-2">✔ SLA garantiti ed Account Manager dedicato</li>
              </ul>
            </div>
            <a href="#attiva" className="w-full py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold text-center transition">
              Contatta Enterprise
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/80 py-12 px-6 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} RM Studio. Tutti i diritti riservati.</p>
          <p className="text-slate-700">I marchi e i servizi elencati nell&apos;ecosistema orbitale appartengono ai rispettivi moduli proprietari di RM Studio.</p>
        </div>
      </footer>

    </div>
  );
}
