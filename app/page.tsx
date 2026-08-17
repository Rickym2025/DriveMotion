"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Upload, Camera, Sparkles, Loader2, CheckCircle2,
  MapPin, Video, Mail, Car, Building2, Volume2,
  ImageIcon, Lock, Globe, Play, Scan, X, Plus, MessageSquare
} from "lucide-react";
import PricingSection from "./components/Pricing";
import Modals from "./components/Modals";
import Footer from "./components/Footer";

const PREDEFINED_ENVIRONMENTS = [
  { id: "luxury",  icon: "✨", it: "Salone Lusso",      en: "Luxury car showroom, bright studio lighting, floor reflections" },
  { id: "city",    icon: "🏙️", it: "Città Moderna",     en: "Modern city street downtown, daylight, realistic urban setting" },
  { id: "mountain",icon: "⛰️", it: "Montagna",           en: "Winding mountain road, scenic view, nature background" },
  { id: "night",   icon: "🌃", it: "Notte Cyber",        en: "Night city street, neon lights, cyberpunk style, wet reflections" },
  { id: "loft",    icon: "🧱", it: "Loft Industriale",   en: "Industrial loft interior, brick walls, cinematic lighting" },
  { id: "studio",  icon: "📸", it: "Studio Foto",        en: "Professional photo studio, infinite white cove, softbox lights" },
  { id: "coast",   icon: "🌅", it: "Tramonto Mare",      en: "Coastal road at sunset, golden hour, ocean in background" },
  { id: "desert",  icon: "🏜️", it: "Deserto",            en: "Desert landscape, warm sand, dramatic sky" },
  { id: "snow",    icon: "❄️", it: "Neve",               en: "Snowy forest road, winter landscape, crisp lighting" },
  { id: "track",   icon: "🏁", it: "Pista da Corsa",     en: "Professional race track, curbs, motion blur background" },
];

const VOICES_CONFIG = {
  it: [
    { id: "nova", name: "Nova (F) — Naturale & Solare", pro: false },
    { id: "shimmer", name: "Shimmer (F) — Elegante & Lusso", pro: true },
    { id: "coral", name: "Coral (F) — Vibrante & Emozionale", pro: true },
    { id: "onyx", name: "Onyx (M) — Profonda & Autorevole", pro: true },
    { id: "echo", name: "Echo (M) — Calda & Rassicurante", pro: true },
    { id: "fable", name: "Fable (M) — Narrativa & Coinvolgente", pro: true },
    { id: "ash", name: "Ash (M) — Chiara & Professionale", pro: true },
    { id: "alloy", name: "Alloy (M/F) — Bilanciata", pro: true }
  ],
  en: [
    { id: "nova", name: "Nova (F) — Bright & Clear", pro: true },
    { id: "shimmer", name: "Shimmer (F) — Soft & Elegant", pro: true },
    { id: "onyx", name: "Onyx (M) — Deep & Bold", pro: true }
  ]
};

const LANGUAGES = [
  { id: "it", flag: "🇮🇹", name: "Italiano" },
  { id: "en", flag: "🇬🇧", name: "English"  },
  { id: "de", flag: "🇩🇪", name: "Deutsch"  },
  { id: "es", flag: "🇪🇸", name: "Español"  },
];

const VERIFICA_TOKEN_URL = "https://n8n.rmstudio.app/webhook/verifica-token-drivemotion";
const N8N_WEBHOOK_URL    = "https://n8n.rmstudio.app/webhook/crea-video";
const CHECK_EMAIL_URL    = "https://n8n.rmstudio.app/webhook/check-email";
const FALLBACK_LOGO_URL  = "https://drivemotion.rmstudio.app/logo.png";

export default function AutoBestPage() {
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const [isPro, setIsPro] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [videoRimanenti, setVideoRimanenti] = useState<number>(0);
  const [freeUsed, setFreeUsed] = useState(false);

  const [showProModal, setShowProModal] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [showSupportModal, setShowSupportModal] = useState(false);

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

  const [selectedEnvId, setSelectedEnvId] = useState(PREDEFINED_ENVIRONMENTS[0].id);
  const [customEnv, setCustomEnv] = useState("");
  const [videoFormat, setVideoFormat] = useState("verticale");
  const [language, setLanguage] = useState("it");
  const [selectedVoice, setSelectedVoice] = useState("d718e944-b313-4998-b011-d1cc078d4ef3");

  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/orbit-template.html")
      .then((res) => res.text())
      .then((html) => {
        if (orbitContainerRef.current) orbitContainerRef.current.innerHTML = html;
      })
      .catch((err) => console.error("Orbit template error:", err));

    const interval = setInterval(() => setDemoStep((p) => (p + 1) % 3), 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 8 - images.length);
    const compressImage = (file: File): Promise<string> =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const MAX = 1080;
            let w = img.width, h = img.height;
            if (w > MAX || h > MAX) {
              const r = Math.min(MAX / w, MAX / h);
              w = Math.round(w * r);
              h = Math.round(h * r);
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL("image/jpeg", 0.95));
          };
        };
      });

    const compressed = await Promise.all(files.map(compressImage));
    setImages((prev) => [...prev, ...compressed]);
  };

  const processAndTrigger = async () => {
    if (images.length === 0 || !email) return;
    setLoadingVideo(true);
    setVideoCompleted(false);

    const envPrompt = selectedEnvId === "custom" ? customEnv : PREDEFINED_ENVIRONMENTS.find((e) => e.id === selectedEnvId)?.en || "";

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: "auto",
          descrizione: `${carMake} ${carEngine} ${carYear}`,
          prezzo: carPrice,
          images,
          logo: (isPro && logo) ? logo : FALLBACK_LOGO_URL,
          email,
          formato: videoFormat,
          lingua: language,
          voice: selectedVoice,
          token,
          project: "DriveMotion",
          environment: envPrompt,
          car_details: { make: carMake, price: carPrice, year: carYear, engine: carEngine },
          agency: { name: agencyName, address: agencyAddress, phone: agencyPhone }
        })
      });

      if (!res.ok) throw new Error("Errore n8n");
      setVideoCompleted(true);
      if (isPro) setVideoRimanenti((prev) => Math.max(0, prev - 1));
    } catch {
      alert("Errore durante la generazione video.");
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative pt-20">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-cyan-400" size={20} />
            <span className="font-bold text-white text-lg">DriveMotion <span className="text-cyan-500">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSupportModal(true)} className="flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-bold text-white hover:bg-white/20">
              <MessageSquare size={16} /> Contattaci
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-16 flex flex-col lg:flex-row items-center gap-16 min-h-[80vh]">
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Car size={14} className="text-cyan-400" /> Cinema AI per Autosaloni
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]">
            Vendi più Auto. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Con l&apos;AI.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-10">
            Carica da 3 a 8 foto. La nostra AI rielabora lo sfondo, crea un testo persuasivo e genera un video da 1 minuto.
          </p>
          <a href="#creatore" className="bg-white text-black font-extrabold rounded-full px-12 py-5 inline-flex items-center gap-2 hover:scale-[1.02] shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            <Play size={20} fill="currentColor" /> Inizia a Creare
          </a>
        </div>
      </header>

      {/* CREATORE FORM */}
      <section id="creatore" className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="text-cyan-400" /> 1. Immagini</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20">
                    <img src={img} className="object-cover w-full h-full" alt="Car" />
                    <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><X size={14} /></button>
                  </div>
                ))}
                {images.length < 8 && (
                  <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5">
                    <Plus size={24} className="text-slate-400" />
                    <input type="file" multiple className="hidden" onChange={handleMultipleFileUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Car className="text-blue-400" /> 2. Dati</h3>
              <div className="space-y-3">
                <input type="text" value={carMake} onChange={(e) => setCarMake(e.target.value)} placeholder="Marca e Modello" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="La tua Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <button onClick={processAndTrigger} disabled={images.length === 0 || !email} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-black py-5 rounded-xl text-lg">
              {loadingVideo ? "Generazione in corso..." : "Genera Video AI"}
            </button>
            {videoCompleted && <div className="mt-4 text-green-400 text-sm">Video inviato con successo alla tua email!</div>}
          </div>
        </div>
      </section>

      {/* SEZIONE PREZZI & CHECKOUT ON-THE-FLY */}
      <PricingSection email={email} />

      {/* MODALS & FOOTER */}
      <Modals showProModal={showProModal} setShowProModal={setShowProModal} showSupportModal={showSupportModal} setShowSupportModal={setShowSupportModal} />
      <Footer onOpenSupport={() => setShowSupportModal(true)} />

      <div id="chatbot-container" />
    </div>
  );
}
