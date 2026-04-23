"use client";

import React, { useState, useEffect } from "react";
import { Upload, Camera, Sparkles, Loader2, CheckCircle2, MapPin, Edit3, Video, Mail, Car, Building2, Volume2, ImageIcon, Lock, Globe, Play, Scan, ArrowRight, X, Plus, MessageSquare } from "lucide-react";

// --- COMPONENTI ICONE SOCIAL CUSTOM ---
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TiktokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- CONFIGURAZIONI ---
const PREDEFINED_ENVIRONMENTS = [
  { id: "luxury", icon: "✨", it: "Salone Lusso", en: "Luxury car showroom, bright studio lighting, floor reflections" },
  { id: "city", icon: "🏙️", it: "Città Moderna", en: "Modern city street downtown, daylight, realistic urban setting" },
  { id: "mountain", icon: "⛰️", it: "Montagna", en: "Winding mountain road, scenic view, nature background" },
  { id: "night", icon: "🌃", it: "Notte Cyber", en: "Night city street, neon lights, cyberpunk style, wet reflections" },
  { id: "loft", icon: "🧱", it: "Loft Industriale", en: "Industrial loft interior, brick walls, cinematic lighting" },
  { id: "studio", icon: "📸", it: "Studio Foto", en: "Professional photo studio, infinite white cove, softbox lights" },
  { id: "coast", icon: "🌅", it: "Tramonto Mare", en: "Coastal road at sunset, golden hour, ocean in background" },
  { id: "desert", icon: "🏜️", it: "Deserto", en: "Desert landscape, warm sand, dramatic sky" },
  { id: "snow", icon: "❄️", it: "Neve", en: "Snowy forest road, winter landscape, crisp lighting" },
  { id: "track", icon: "🏁", it: "Pista da Corsa", en: "Professional race track, curbs, motion blur background" },
];

const VOICES_CONFIG = {
  it: [
    { id: "aura-2-livia-it", name: "Livia (F) — Elegante", pro: false },
    { id: "aura-2-cinzia-it", name: "Cinzia (F) — Dinamica", pro: true },
    { id: "aura-2-demetra-it", name: "Demetra (F) — Social", pro: true },
    { id: "aura-2-cesare-it", name: "Cesare (M) — Serio", pro: true },
    { id: "aura-2-arcangelo-it", name: "Arcangelo (M) — Professionale", pro: true }
  ],
  en: [
    { id: "aura-2-thalia-en", name: "Thalia (F) — English", pro: true },
    { id: "aura-asteria-en", name: "Asteria (F) — English", pro: true }
  ],
  de: [
    { id: "aura-2-aurelia-de", name: "Aurelia (F) — Deutsch", pro: true },
    { id: "aura-2-fabian-de", name: "Fabian (M) — Deutsch", pro: true }
  ]
};

const LANGUAGES = [
  { id: "it", flag: "🇮🇹", name: "Italiano" },
  { id: "en", flag: "🇬🇧", name: "English" },
  { id: "de", flag: "🇩🇪", name: "Deutsch" }
];

export default function AutoBestPage() {
  const [isPro, setIsPro] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);

  // --- LOGICA CHATBOT AURORA AI ---
  useEffect(() => {
    const CHATBOT_WEBHOOK_URL = 'https://n8n.labottegadeldelta.it/webhook/drivemotion-chat';
    let chatSessionId = localStorage.getItem('dm_chat_session') || 'dm_' + Math.random().toString(36).substring(7);
    localStorage.setItem('dm_chat_session', chatSessionId);

    const injectChatbot = () => {
      const container = document.getElementById('chatbot-container');
      if (!container) return;

      container.innerHTML = `
        <style>
          #dm-bubble { position:fixed; bottom:30px; left:30px; width:65px; height:65px; border-radius:50%; background:#06b6d4; box-shadow:0 10px 25px rgba(6, 182, 212, 0.4); cursor:pointer; z-index:9999; display:flex; align-items:center; justify-content:center; border:2px solid #161616; transition:transform 0.3s; }
          #dm-bubble:hover { transform:scale(1.1); }
          #dm-window { position:fixed; bottom:110px; left:30px; width:360px; height:500px; background:#0a0a0c; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.8); z-index:9999; display:none; flex-direction:column; overflow:hidden; font-family: sans-serif; border: 1px solid rgba(6, 182, 212, 0.2); transition: all 0.3s ease; opacity:0; transform:translateY(20px); }
          .dm-header { background:#161616; border-bottom: 1px solid rgba(6, 182, 212, 0.2); color:#fff; padding:16px 20px; font-weight:700; display:flex; justify-content:space-between; align-items:center; }
          .dm-messages { flex:1; padding:20px; overflow-y:auto; background:#050505; display:flex; flex-direction:column; gap:14px; }
          .dm-msg { padding:12px 16px; border-radius:15px; font-size:14px; max-width:85%; line-height:1.5; }
          .dm-msg.bot { background:#161616; color:#f0f0f0; align-self:flex-start; border-bottom-left-radius:2px; border: 1px solid rgba(255,255,255,0.05); }
          .dm-msg.user { background:#06b6d4; color:#000; align-self:flex-end; border-bottom-right-radius:2px; font-weight:500; }
          .dm-input-area { padding:15px; border-top:1px solid rgba(6, 182, 212, 0.2); display:flex; gap:8px; background:#161616; }
          .dm-input-area input { flex:1; border:1px solid #333; border-radius:8px; padding:8px 12px; background:#000; color:#fff; outline:none; }
          .dm-input-area button { background:#06b6d4; border:none; border-radius:8px; color:#000; font-weight:bold; padding:0 15px; cursor:pointer; }
          .typing-dot { width: 4px; height: 4px; background: #06b6d4; border-radius: 50%; display: inline-block; animation: typing 1.4s infinite; margin-right: 2px; }
          @keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        </style>
        <div id="dm-bubble">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div id="dm-window">
            <div class="dm-header">
                <span>Aurora AI 🏎️</span>
                <button id="close-chat" style="background:none; border:none; color:#666; font-size:20px; cursor:pointer;">&times;</button>
            </div>
            <div id="dm-messages" class="dm-messages">
                <div class="dm-msg bot">Ciao! Sono <b>Aurora</b>. 🏎️<br><br>Ti aiuto a creare video pazzeschi per le tue auto in 5 minuti. Cosa vuoi sapere?</div>
            </div>
            <div class="dm-input-area">
                <input type="text" id="dm-input" placeholder="Scrivi qui...">
                <button id="send-btn">Invia</button>
            </div>
        </div>
      `;

      // Eventi
      const bubble = document.getElementById('dm-bubble');
      const win = document.getElementById('dm-window');
      const close = document.getElementById('close-chat');
      const input = document.getElementById('dm-input') as HTMLInputElement;
      const sendBtn = document.getElementById('send-btn');

      const toggleChat = () => {
        if (win!.style.display === 'none' || win!.style.display === '') {
          win!.style.display = 'flex';
          setTimeout(() => { win!.style.opacity = '1'; win!.style.transform = 'translateY(0)'; }, 10);
        } else {
          win!.style.opacity = '0';
          win!.style.transform = 'translateY(20px)';
          setTimeout(() => { win!.style.display = 'none'; }, 300);
        }
      };

      bubble!.onclick = toggleChat;
      close!.onclick = toggleChat;

      const addMsg = (text: string, sender: 'bot' | 'user', id?: string) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `dm-msg ${sender}`;
        if (id) msgDiv.id = id;
        msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        const box = document.getElementById('dm-messages');
        box?.appendChild(msgDiv);
        box?.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
      };

      const sendMsg = async () => {
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        addMsg(text, 'user');
        
        const loadingId = 'loading-' + Date.now();
        addMsg('<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>', 'bot', loadingId);

        try {
          const res = await fetch(`${CHATBOT_WEBHOOK_URL}?message=${encodeURIComponent(text)}&sessionId=${chatSessionId}`, { method: 'POST' });
          const data = await res.json();
          document.getElementById(loadingId)?.remove();
          addMsg(data.response || "Scusami, riprova.", 'bot');
        } catch (e) {
          document.getElementById(loadingId)?.remove();
          addMsg("Errore di connessione.", 'bot');
        }
      };

      sendBtn!.onclick = sendMsg;
      input.onkeypress = (e) => { if (e.key === 'Enter') sendMsg(); };
    };

    injectChatbot();
  }, []);
  
  // Funzione per invio form
  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSupportLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Usiamo Web3Forms per inviare l'email senza backend
    formData.append("access_key", "9013a8d5-0901-42a0-b9e6-4c45553f960d"); // Questa è la chiave del file che hai postato, assicurati sia attiva o usane una nuova su web3forms.com

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).then((res) => res.json());

      if (res.success) {
        setSupportSuccess(true);
        setTimeout(() => {
          setShowSupportModal(false);
          setSupportSuccess(false);
        }, 3000);
      }
    } catch (err) {
      alert("Errore nell'invio del messaggio.");
    } finally {
      setSupportLoading(false);
    }
  };
  // Stati Form
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carEngine, setCarEngine] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyAddress, setAgencyAddress] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");

  // Impostazioni Video
  const [selectedEnvId, setSelectedEnvId] = useState(PREDEFINED_ENVIRONMENTS[0].id);
  const [customEnv, setCustomEnv] = useState("");
  const [videoFormat, setVideoFormat] = useState("verticale");
  const [language, setLanguage] = useState("it");
  const [selectedVoice, setSelectedVoice] = useState("aura-2-livia-it");

  // Stati Rete
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const MODAL_URL = "https://smartai-riccardo--drive-motion-backend-fastapi-app.modal.run/process";
  const N8N_WEBHOOK_URL = "https://n8n.labottegadeldelta.it/webhook/autobest";
  const VERIFICA_TOKEN_URL = "https://n8n.labottegadeldelta.it/webhook/verifica-token";

  // Gestione Cambio Lingua
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const firstVoiceOfLang = VOICES_CONFIG[lang as keyof typeof VOICES_CONFIG][0].id;
    setSelectedVoice(firstVoiceOfLang);
  };

  useEffect(() => {
    const checkToken = async () => {
      const urlToken = new URLSearchParams(window.location.search).get('token');
      const savedToken = localStorage.getItem('ab_token');
      const tokenToUse = urlToken || savedToken;
      if (!tokenToUse) return;
      try {
        const res = await fetch(`${VERIFICA_TOKEN_URL}?token=${tokenToUse}`);
        const data = await res.json();
        if (data.valido) {
          setIsPro(true); setToken(tokenToUse); localStorage.setItem('ab_token', tokenToUse);
          if (urlToken) window.history.replaceState({}, '', window.location.pathname);
        } else localStorage.removeItem('ab_token');
      } catch (err) { }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 8 - images.length);

    const compressImage = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        // Mostra il peso originale in console
        console.log(`Comprimo: ${file.name} (Originale: ${(file.size / 1024 / 1024).toFixed(2)} MB)`);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_DIMENSION = 1080; // Lato massimo a 1080px (ideale per i video)
            let width = img.width;
            let height = img.height;

            // Logica universale per mantenere le proporzioni (verticali o orizzontali)
            if (width > height) {
              if (width > MAX_DIMENSION) {
                height = Math.round((height * MAX_DIMENSION) / width);
                width = MAX_DIMENSION;
              }
            } else {
              if (height > MAX_DIMENSION) {
                width = Math.round((width * MAX_DIMENSION) / height);
                height = MAX_DIMENSION;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // Forza lo sfondo nero se l'immagine è un PNG con trasparenze
            if (ctx) {
              ctx.fillStyle = "#000000";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);
            }

            // Esporta forzatamente in JPEG a 70% di qualità
            const base64 = canvas.toDataURL('image/jpeg', 0.7);

            // Calcola il peso finale (in Base64 un carattere = 0.75 byte)
            const finalSizeMB = (base64.length * 0.75) / 1024 / 1024;
            console.log(`✅ File ${file.name} compresso! (Nuovo peso: ~${finalSizeMB.toFixed(2)} MB)`);

            resolve(base64);
          };
        };
      });
    };

    // Attendiamo che tutte le immagini vengano compresse
    const promises = files.map(file => compressImage(file));
    Promise.all(promises).then(base64s => {
      setImages(prev => [...prev, ...base64s]);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const processAndTrigger = async () => {
    if (images.length === 0 || !email) return;
    setLoadingImg(true); setVideoCompleted(false);
    let englishPrompt = selectedEnvId === "custom" ? customEnv : PREDEFINED_ENVIRONMENTS.find(e => e.id === selectedEnvId)?.en || "";

    try {
      // PROCESSIAMO TUTTE LE IMMAGINI CON MODAL IN PARALLELO
      const modalPromises = images.map(async (imgBase64) => {
        try {
          const res = await fetch(MODAL_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_b64: imgBase64, env_english: englishPrompt }),
          });
          const data = await res.json();
          // Se Modal ha successo restituisce l'immagine scontornata, altrimenti l'originale
          return data.status === "success" ? data.image : imgBase64; 
        } catch (e) {
          return imgBase64; // Fallback di sicurezza in caso di errore di rete
        }
      });

      const finalImagesArray = await Promise.all(modalPromises);
      
      setLoadingImg(false); setLoadingVideo(true);

      await fetch(N8N_WEBHOOK_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: finalImagesArray,
          logo: logo || "",
          email,
          formato: videoFormat,
          lingua: language,
          voice: selectedVoice,
          token,
          environment: englishPrompt,
          car_details: { make: carMake, price: carPrice, year: carYear, engine: carEngine },
          agency: { name: agencyName, address: agencyAddress, phone: agencyPhone }
        }),
      });

      setLoadingVideo(false); setVideoCompleted(true);
    } catch (err) {
      alert("Errore durante la generazione.");
      setLoadingImg(false); setLoadingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative pt-20">

      {/* NAVBAR aggiornata con link esatti */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-cyan-400" size={20} />
            <span className="font-bold text-white tracking-wide text-lg">DriveMotion <span className="text-cyan-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="https://hometour-studio.vercel.app/" target="_blank" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">HomeTour</a>
            <a href="https://omniastudio-pro.vercel.app/" target="_blank" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">OmniaStudio</a>
            <a href="https://concierge24.vercel.app/" target="_blank" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Concierge24</a>
          </div>
          <button className="flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-bold text-white hover:bg-white/20 transition-colors">
            <MessageSquare size={16} /> Supporto
          </button>
        </div>
      </nav>
      
      {/* SFONDO VIDEO */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        <video src="/bg.mp4" autoPlay loop muted playsInline style={{ transform: 'translate3d(0, 0, 0)' }} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#050505]/70 to-[#050505]" />
      </div>

      <div className="relative z-10">
        {isPro && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-full px-6 py-2 flex items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Account PRO Attivo</span>
          </div>
        )}

        {/* HERO SECTION */}
        <header className="max-w-7xl mx-auto px-6 pt-10 pb-16 flex flex-col lg:flex-row items-center gap-16 min-h-[80vh]">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Car size={14} className="text-cyan-400" /> Cinema AI per Autosoloni
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1] drop-shadow-lg">
              Vendi più Auto. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Con l'Intelligenza Artificiale.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              Carica da 3 a 8 foto dal parcheggio. La nostra AI rielabora la foto principale, cambia lo sfondo, crea un testo persuasivo e genera un video da 1 minuto in pochi minuti.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="#creatore" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                <Play size={18} fill="currentColor" /> Inizia a Creare
              </a>
              <a href="#prezzi" className="bg-black/50 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 backdrop-blur-md">
                Vedi i Piani
              </a>
            </div>
          </div>

          {/* ESEMPIO VISUALE ANIMATO */}
          <div className="flex-1 w-full max-w-[320px] relative">
            <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative border-[6px] border-[#1a1a1a] bg-[#050505] rounded-[3rem] overflow-hidden aspect-[9/19] shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-7 bg-[#1a1a1a] rounded-b-3xl w-1/2 mx-auto z-50" />

              <div className={`absolute inset-0 transition-opacity duration-1000 ${demoStep === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-75" alt="Parking" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-2 flex items-center gap-2 shadow-lg">
                    <Camera size={16} /> 1. Scatto Parcheggio
                  </div>
                </div>
              </div>
              <div className={`absolute inset-0 transition-opacity duration-1000 bg-[#0a0a0c] flex items-center justify-center flex-col ${demoStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <Scan size={64} className="text-cyan-400 mb-6 animate-pulse" />
                <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2 text-center">Rielaborazione AI...</h3>
              </div>
              <div className={`absolute inset-0 transition-opacity duration-1000 bg-black ${demoStep === 2 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                <img src="https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Showroom" />
                <div className="absolute bottom-12 left-6 right-16 z-30">
                  <div className="bg-red-600 text-white text-xs font-black italic px-3 py-1 inline-block uppercase -skew-x-12 mb-2 shadow-lg">Pronta Consegna</div>
                  <h3 className="text-white font-black text-xl uppercase mb-1 drop-shadow-md">Audi RS6</h3>
                </div>
              </div>
            </div>

            {/* CONTAINER CHATBOT */}
      <div id="chatbot-container"></div>
            
          </div>
        </header>

        {/* TOOL PRINCIPALE (Creatore) */}
        <section id="creatore" className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

            <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-white/10 justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <Globe className="text-slate-400" />
                <select value={language} onChange={e => handleLanguageChange(e.target.value)} className="bg-black border border-white/20 text-white rounded-lg px-4 py-2 outline-none focus:border-cyan-500 cursor-pointer">
                  {LANGUAGES.map(l => <option key={l.id} value={l.id}>{l.flag} {l.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Video className="text-slate-400" />
                <div className="flex bg-black rounded-lg p-1 border border-white/20">
                  <button onClick={() => setVideoFormat("verticale")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${videoFormat === 'verticale' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>Verticale 9:16</button>
                  <button onClick={() => setVideoFormat("orizzontale")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${videoFormat === 'orizzontale' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>Orizzontale 16:9</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-10">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="text-cyan-400" /> 1. Immagini (Max 8)</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20 bg-black group shadow-lg">
                        <img src={img} className="object-cover w-full h-full" />
                        <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"><X size={14} /></button>
                      </div>
                    ))}
                    {images.length < 8 && (
                      <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group">
                        <Plus size={24} className="text-slate-400 group-hover:text-cyan-400" />
                        <input type="file" multiple className="hidden" onChange={handleMultipleFileUpload} accept="image/*" />
                      </label>
                    )}
                  </div>

                  <div onClick={!isPro ? () => setShowProModal(true) : undefined} className={`relative border-2 border-dashed rounded-2xl transition-all p-4 ${logo ? 'border-cyan-500/50 bg-black/50' : 'border-white/10 bg-black/40'} ${!isPro && 'opacity-50 cursor-pointer'}`}>
                    {!isPro && <div className="absolute top-2 right-2 text-red-400"><Lock size={14} /></div>}
                    {!logo ? (
                      <label className={`flex flex-col items-center justify-center ${isPro ? 'cursor-pointer' : ''}`}>
                        <Upload size={20} className="text-slate-500 mb-1" />
                        <span className="text-sm font-medium">Logo Autosalone (PRO)</span>
                        {isPro && <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/png" />}
                      </label>
                    ) : (
                      <div className="relative h-12 flex items-center justify-center"><img src={logo} className="max-h-full" /><button onClick={() => setLogo(null)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-red-600"><X size={12} /></button></div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MapPin className="text-purple-400" /> 2. Sfondo Magico AI</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {PREDEFINED_ENVIRONMENTS.map((env) => (
                      <button key={env.id} onClick={() => setSelectedEnvId(env.id)} className={`p-3 rounded-xl border text-xs text-left transition-all ${selectedEnvId === env.id ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'}`}>
                        {env.icon} {env.it}
                      </button>
                    ))}
                    <button onClick={() => setSelectedEnvId("custom")} className={`p-3 rounded-xl border text-xs text-left transition-all col-span-2 md:col-span-3 ${selectedEnvId === "custom" ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-white/10 bg-black/50 text-slate-400'}`}>
                      ✍️ Scrivi tu lo sfondo...
                    </button>
                  </div>
                  {selectedEnvId === "custom" && (
                    <input type="text" placeholder="Es. Strada piovosa a tokyo, luci neon..." value={customEnv} onChange={(e) => setCustomEnv(e.target.value)} className="w-full mt-3 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-all" />
                  )}
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Car className="text-blue-400" /> 3. Dati Veicolo</h3>
                  <div className="space-y-3">
                    <input type="text" value={carMake} onChange={e => setCarMake(e.target.value)} placeholder="Marca e Modello" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" value={carYear} onChange={e => setCarYear(e.target.value)} placeholder="Anno" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all" />
                      <input type="text" value={carPrice} onChange={e => setCarPrice(e.target.value)} placeholder="Prezzo" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all" />
                    </div>
                    <input type="text" value={carEngine} onChange={e => setCarEngine(e.target.value)} placeholder="Motore / Allestimento" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Building2 className="text-orange-400" /> 4. Autosalone & Voce</h3>
                  <div className="space-y-3">
                    <input type="text" value={agencyName} onChange={e => setAgencyName(e.target.value)} placeholder="Nome del Salone" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" value={agencyAddress} onChange={e => setAgencyAddress(e.target.value)} placeholder="Città / Indirizzo" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all" />
                      <input type="text" value={agencyPhone} onChange={e => setAgencyPhone(e.target.value)} placeholder="Telefono" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all" />
                    </div>
                    <div className="relative mt-2" onClick={(!isPro && language !== 'it') ? () => setShowProModal(true) : undefined}>
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 appearance-none ${(!isPro && language !== 'it') ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                      >
                        {VOICES_CONFIG[language as keyof typeof VOICES_CONFIG].map(v => (
                          <option key={v.id} value={v.id} disabled={v.pro && !isPro}>{v.name} {v.pro && !isPro ? '🔒' : ''}</option>
                        ))}
                      </select>
                      <Volume2 className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PULSANTE FINALE */}
            <div className="mt-12 pt-8 border-t border-white/10 max-w-2xl mx-auto relative z-10">
              <div className="relative mb-4">
                <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
                <input type="email" placeholder="La tua Email per ricevere i materiali..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white focus:border-cyan-500 outline-none shadow-inner transition-all" />
              </div>
              <button onClick={processAndTrigger} disabled={images.length === 0 || loadingImg || loadingVideo || !email.includes('@')} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg py-5 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(34,211,238,0.25)] transform active:scale-95">
                {loadingImg || loadingVideo ? <Loader2 className="animate-spin" size={24} /> : <Video size={24} />}
                {loadingImg ? "Rielaborazione AI..." : loadingVideo ? "Rendering Video..." : "Genera Video e Post Social"}
              </button>
              {videoCompleted && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm font-medium bg-green-400/10 p-3 rounded-lg border border-green-400/20 animate-in fade-in">
                  <CheckCircle2 size={18} /> Inviato! Riceverai il video via email tra pochi minuti.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PRICING SECTION AGGIORNATA */}
      <section id="prezzi" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Piani Prepagati</h2>
            <p className="text-slate-400 text-lg">Acquista pacchetti video. Zero vincoli, zero abbonamenti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-all group">
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-cyan-400">Starter</h3>
              <div className="text-4xl font-black text-white mb-6">€ 14,90</div>
              <ul className="space-y-4 text-sm text-slate-300 flex-1 mb-8">
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> 1 Video Singolo</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Sfondo AI</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Post Social Inclusi</li>
              </ul>
              <a href="https://buy.stripe.com/test_6oU00k0wK2su1hw9Fpdwc06" className="block text-center w-full border border-white/20 hover:bg-white/10 py-3.5 rounded-full font-bold transition-all">Acquista Ora</a>
            </div>

            <div className="bg-gradient-to-b from-cyan-900/40 to-[#0a0a0c]/90 backdrop-blur-xl border border-cyan-500/50 rounded-[2rem] p-8 flex flex-col relative shadow-[0_0_40px_rgba(34,211,238,0.15)] transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Più Scelto</div>
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Pro (5 Video)</h3>
              <div className="text-4xl font-black text-white mb-2">€ 59,00<span className="text-lg font-normal text-slate-400">/mese</span></div>
              <ul className="space-y-4 text-sm text-white flex-1 mb-8 mt-4">
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> 5 Video Mensili</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Logo Salone in Video</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Supporto Multi-lingua</li>
              </ul>
              <a href="https://buy.stripe.com/test_28EcN66V8gjk0ds18Tdwc07" className="block text-center w-full bg-cyan-500 text-black hover:bg-cyan-400 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/25">Abbonati PRO</a>
            </div>

            <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-all">
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Enterprise (15 Video)</h3>
              <div className="text-4xl font-black text-white mb-2">€ 129,00<span className="text-lg font-normal text-slate-400">/mese</span></div>
              <ul className="space-y-4 text-sm text-slate-300 flex-1 mb-8 mt-4">
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> 15 Video Mensili</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Funzioni PRO complete</li>
                <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> Supporto Prioritario</li>
              </ul>
              <a href="https://buy.stripe.com/test_aFa28s7Zc1oq8JYg3Ndwc08" className="block text-center w-full border border-white/20 hover:bg-white/10 py-3.5 rounded-full font-bold transition-all">Abbonati Enterprise</a>
            </div>
          </div>
        </section>

        {/* ALTRI PRODOTTI SECTION */}
        <section className="border-t border-white/10 bg-[#020202]/80 backdrop-blur-xl py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 italic">Ecosistema MR Studio</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Sfrutta la potenza dell'Intelligenza Artificiale per ottimizzare ogni aspetto del tuo business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="https://hometour-studio.vercel.app/" target="_blank" className="block bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all group text-left h-full flex flex-col shadow-2xl">
                <div className="text-xs font-bold text-cyan-500 tracking-widest uppercase mb-4">Real Estate</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">HomeTour AI</h3>
                <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">Trasforma le foto dei tuoi immobili in Reel cinematografici con voce narrante professionale e testi pronti.</p>
                <div className="flex items-center text-cyan-400 text-sm font-black uppercase tracking-widest">Scopri <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></div>
              </a>

              <a href="https://omniastudio-pro.vercel.app/" target="_blank" className="block bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all group text-left h-full flex flex-col shadow-2xl">
                <div className="text-xs font-bold text-purple-500 tracking-widest uppercase mb-4">Legal & Privacy</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">OmniaStudio</h3>
                <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">Intelligenza Artificiale 100% locale installata sui tuoi server per avvocati e commercialisti.</p>
                <div className="flex items-center text-purple-400 text-sm font-black uppercase tracking-widest">Scopri <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></div>
              </a>

              <a href="https://concierge24.vercel.app/" target="_blank" className="block bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition-all group text-left h-full flex flex-col shadow-2xl">
                <div className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-4">Hospitality</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Concierge24</h3>
                <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">L'assistente virtuale multilingua H24 per Hotel e Airbnb. Gestisce prenotazioni e consiglia ristoranti.</p>
                <div className="flex items-center text-orange-400 text-sm font-black uppercase tracking-widest">Scopri <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></div>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        {/* FOOTER AGGIORNATO CON SOCIAL */}
        <footer className="border-t border-white/10 bg-black py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="max-w-xs">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-black text-2xl mb-4 tracking-tighter">DriveMotion <span className="text-cyan-500">AI</span></div>
              <p className="text-slate-500 text-sm leading-relaxed">Tecnologia proprietaria MR Studio. Semplifichiamo il marketing automotive attraverso l'Intelligenza Artificiale Generativa.</p>
              <p className="text-slate-600 text-xs mt-6">© {new Date().getFullYear()} MR Studio. </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Social Hub</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/riccardo_mode_/" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"><InstagramIcon size={20} /></a>
                <a href="https://www.facebook.com/riccardo.modena.792" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"><FacebookIcon size={20} /></a>
                <a href="https://www.linkedin.com/in/riccardo-modena-13918a61/" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600/50 hover:bg-blue-600/10 transition-all group"><LinkedinIcon size={20} /></a>
                <a href="https://www.tiktok.com/@mr3d.riccardo" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group"><TiktokIcon size={20} /></a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Supporto</h4>
              <a href="mailto:modena.riccardo@gmail.com" className="text-slate-400 text-sm hover:text-white">modena.riccardo@gmail.com</a>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL BLOCCO PRO */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center px-4 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0a0a0c] border border-cyan-500/30 rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <Lock className="text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" size={48} />
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Sblocca il Potenziale</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">L'inserimento del logo aziendale e le voci AI premium in lingua straniera sono disponibili esclusivamente nei pacchetti video prepagati.</p>
            <div className="space-y-3">
              <a href="#prezzi" onClick={() => setShowProModal(false)} className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-600/20">Vedi i Pacchetti</a>
              <button onClick={() => setShowProModal(false)} className="block w-full text-slate-500 hover:text-white py-2 font-bold text-sm transition-colors uppercase tracking-widest">Chiudi</button>
            </div>
          </div>
        </div>
      )}

      {/* STYLE CSS ANIMATIONS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
          html { scroll-behavior: smooth; }
      `}} />
      {/* MODAL SUPPORTO (Recuperato e adattato) */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center px-4 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0a0a0c] border border-white/10 rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setShowSupportModal(false)} 
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Contatta il Supporto</h3>
              <p className="text-slate-400 text-sm">Hai bisogno di aiuto con i tuoi video o vuoi un progetto su misura? Scrivici e ti risponderemo subito.</p>
            </div>

            {supportSuccess ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in zoom-in">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-white font-bold text-xl mb-1">Messaggio Inviato!</h4>
                <p className="text-slate-400 text-sm">Riccardo ti risponderà a breve su modena.riccardo@gmail.com</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                {/* Honeypot per evitare spam */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Il tuo Nome</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Mario Rossi" 
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-white focus:border-cyan-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email di Contatto</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="mario@azienda.it" 
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-white focus:border-cyan-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Come possiamo aiutarti?</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Descrivi la tua richiesta..." 
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-white focus:border-cyan-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={supportLoading}
                  className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all disabled:opacity-50 mt-4"
                >
                  {supportLoading ? <Loader2 className="animate-spin" size={20} /> : <Mail size={20} />}
                  {supportLoading ? "Invio in corso..." : "Invia Messaggio"}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Diretto: modena.riccardo@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
