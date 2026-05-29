import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* CSS ISOLATO E ANIMAZIONI DI NEUROSCIENZA (Visual Hook e Rotazioni Orbit) */}
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
          0%, 100% { transform: scale(1); opacity: 0.45; filter: blur(80px); }
          50% { transform: scale(1.15); opacity: 0.7; filter: blur(100px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.2; }
          50% { transform: scale(1.08); opacity: 0.4; }
          100% { transform: scale(0.95); opacity: 0.2; }
        }
        @keyframes gold-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(234, 179, 8, 0.2), inset 0 0 12px rgba(234, 179, 8, 0.1); }
          50% { box-shadow: 0 0 28px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(234, 179, 8, 0.3); border-color: rgba(234, 179, 8, 0.8); }
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
          animation: netflix-glow 6s ease-in-out infinite;
        }
        .pulse-ring-element {
          animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .gold-decoy-card {
          animation: gold-pulse 3s infinite ease-in-out;
        }
      ` }} />

      {/* HEADER */}
      <header className="border-b border-white/5 py-4 px-6 md:px-12 backdrop-blur-md bg-black/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black text-sm">RM</div>
            <span className="font-semibold tracking-wider text-sm text-slate-300">RM STUDIO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#ecosistema" className="hover:text-white transition">Ecosistema AI</a>
            <a href="#authorities" className="hover:text-white transition">Standard Scientifici</a>
            <a href="#pricing" className="hover:text-white transition">Piani</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION - Configurato con Layout a "F" per la familiarità */}
      <section id="ecosistema" className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ELEMENTO DYNAMICO LUMINOSO - REGOLA 3: Il Visual Hook di 3 secondi (Effetto Netflix) */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-500/10 to-orange-500/15 rounded-full filter blur-3xl pointer-events-none visual-hook-glow z-0" />
        
        {/* PARTE SINISTRA: Testo e CTA - Struttura per Layout a "F" */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          
          {/* Badge informativo */}
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1 text-xs text-cyan-400 mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Ecosistema AI Integrato
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Automazione Intelligente per la Crescita del Tuo Business.
          </h1>

          {/* REGOLA 1: Riduzione della Frizione di Lettura (Testo >= 18px) */}
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
            Semplifica la gestione dei tuoi canali operativi e riduci lo sforzo decisionale. L&apos;ecosistema sviluppato da Riccardo Modena impiega soluzioni AI avanzate per convertire le interazioni degli utenti in risultati misurabili.
          </p>

          {/* REGOLA 7: Consolidamento Decisionale (CTA Ravvicinate) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            
            {/* REGOLA 2: Dominanza Visiva del Pulsante di Conversione (Dimensione x2) */}
            <a 
              href="#pricing" 
              className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wide rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] text-lg md:text-xl px-10 py-5 shadow-[0_0_30px_rgba(6,182,212,0.3)] min-w-[240px]"
            >
              Attiva Ora Gratis
            </a>

            {/* Pulsante secondario (fisicamente molto più piccolo per stabilire gerarchia) */}
            <a 
              href="#ecosistema" 
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Scopri i moduli
            </a>
          </div>

          {/* REGOLA 5: Associazione Umana e Fiducia (Persone = Conversione) */}
          <div className="flex items-center gap-3 border-t border-slate-900 pt-6">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs overflow-hidden">
                {/* Avatar assistente virtuale */}
                <span className="font-semibold text-cyan-400">AI</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">Assistente Virtuale RM Studio</p>
              <p className="text-xs text-slate-500">Sempre online per supportare le tue scelte configurative</p>
            </div>
          </div>

        </div>

        {/* PARTE DESTRA: Widget Orbitale RM Studio a 6 Elementi */}
        <div className="lg:col-span-5 flex justify-center items-center z-10 relative">
          
          {/* Anelli concentrici pulsanti di background legati alla regola 3 */}
          <div className="absolute w-[360px] h-[360px] border border-cyan-500/5 rounded-full pulse-ring-element pointer-events-none" />
          <div className="absolute w-[440px] h-[440px] border border-orange-500/5 rounded-full pulse-ring-element pointer-events-none" style={{ animationDelay: '2s' }} />

          {/* WIDGET ORBITALE INTEGRATO IN TSX */}
          <div className="orbit-container-wrapper relative w-full max-w-[500px] mx-auto min-h-[440px]">
            <div className="orbit-area">
              <div className="orbit-ring">
                
                {/* 1. Concierge24 (0° - Alto al centro) */}
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

                {/* 2. DriveMotion (60° - Alto a destra) */}
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

                {/* 3. Nexus AI (120° - Basso a destra) */}
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

                {/* 4. OmniaStudio (180° - Basso al centro) */}
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

                {/* 5. FF Edizioni (240° - Basso a sinistra) */}
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

                {/* 6. HomeTour AI (300° - Alto a sinistra) */}
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

              {/* Foto del Fondatore fissa al centro - REGOLA 5 & E-E-A-T */}
              <div className="orbit-center-photo">
                <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/riccardo_founder.jpeg" alt="Riccardo Modena - Fondatore RM Studio" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* REGOLA 6: Autorevolezza Scientifica ed E-E-A-T */}
      <section id="authorities" className="bg-slate-950/40 border-y border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <p className="text-center md:text-left text-slate-400 font-medium">
            Progettato in aderenza agli standard internazionali di settore e linee guida istituzionali:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
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
              ISO/IEC 27001 Security
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

      {/* REGOLA 8: Decoy Pricing (Ancoraggio del Prezzo) */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Tariffe Semplici e Trasparenti</h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Configura il piano ideale per le necessità operative della tua struttura o agenzia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Opzione 1: Starter (Basso Costo) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 flex flex-col justify-between transition-colors hover:border-slate-700">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-4">Starter</span>
              <div className="text-3xl font-bold text-white mb-4">€19<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Strumenti essenziali per iniziare a ottimizzare i flussi e familiarizzare con le automazioni base.
              </p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">✔ Accesso a 1 modulo a scelta</li>
                <li className="flex items-center gap-2">✔ Supporto asincrono via email</li>
                <li className="flex items-center gap-2">✔ Aggiornamenti standard</li>
              </ul>
            </div>
            <a href="#scelta" className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold text-center transition">
              Scegli Starter
            </a>
          </div>

          {/* Opzione 2: PRO - L&apos;Esca Decoy ad Alto Valore (Con bagliore pulsante dorato) */}
          <div className="relative bg-slate-900 border border-yellow-500/30 rounded-xl p-8 flex flex-col justify-between gold-decoy-card transform md:-translate-y-4">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full">
              Consigliato
            </div>
            <div>
              <span className="text-xs font-semibold text-yellow-500 uppercase tracking-widest block mb-4">Professional PRO</span>
              <div className="text-4xl font-extrabold text-white mb-4">€49<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Il pacchetto completo con tutti i 6 moduli attivi e l&apos;assistente AI configurato sui tuoi dati aziendali.
              </p>
              <ul className="space-y-3 text-slate-200 text-sm mb-8">
                <li className="flex items-center gap-2 text-yellow-500/90 font-medium">★ Tutti i 6 moduli orbitali sbloccati</li>
                <li className="flex items-center gap-2">✔ Integrazione API personalizzabile</li>
                <li className="flex items-center gap-2">✔ Assistente virtuale prioritario</li>
                <li className="flex items-center gap-2">✔ Supporto dedicato in 4 ore</li>
              </ul>
            </div>
            <a href="#scelta" className="w-full py-3 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold text-center transition shadow-lg shadow-yellow-500/20">
              Sblocca Professional PRO
            </a>
          </div>

          {/* Opzione 3: Maxi (Alto Costo per generare ancoraggio) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 flex flex-col justify-between transition-colors hover:border-slate-700">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-4">Maxi Enterprise</span>
              <div className="text-3xl font-bold text-white mb-4">€149<span className="text-sm font-normal text-slate-500">/mese</span></div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Per grandi strutture che necessitano di soluzioni isolate offline e accordi di livello di servizio su misura.
              </p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">✔ Licenze OmniaStudio illimitate</li>
                <li className="flex items-center gap-2">✔ Server e database dedicati</li>
                <li className="flex items-center gap-2">✔ SLA contrattualizzati (99.9%)</li>
              </ul>
            </div>
            <a href="#scelta" className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold text-center transition">
              Contatta Enterprise
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-6 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} RM Studio. Tutti i diritti riservati.</p>
          <p>Le informazioni descritte fanno riferimento all&apos;architettura di prodotto sviluppata da Riccardo Modena.</p>
        </div>
      </footer>

    </div>
  );
}
