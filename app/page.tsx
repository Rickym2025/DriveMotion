"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import VideoGeneratorForm from "./components/VideoGeneratorForm";
import PricingSection from "./components/PricingSection";
import FaqSection from "./components/FaqSection";
import EcosystemSection from "./components/EcosystemSection";
import Footer from "./components/Footer";
import Modals from "./components/Modals";
import Chatbot from "./components/Chatbot";

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

const FAQS = [
  { q: "Come trasforma DriveMotion le normali foto del piazzale in video cinematografici?", a: "La nostra pipeline di visione artificiale identifica la sagoma dell'auto, isola la carrozzeria e rimuove gli sfondi disordinati. Successivamente genera un set fotorealistico 3D (showroom, tornanti di montagna o pista) e anima la vettura con movimenti di camera dinamici ed effetti di velocità sull'asfalto." },
  { q: "Quanto tempo ci vuole per ricevere il video completato?", a: "Una volta inviato il form con le foto, i nostri server di rendering ad alta potenza elaborano il video in circa 3-5 minuti. Il link definitivo per scaricare il file MP4 in Full HD viene inviato istantaneamente all'indirizzo email indicato." },
  { q: "Che tipo di foto devo caricare per ottenere la massima resa?", a: "Bastano da 3 a 8 scatti eseguiti con un comune smartphone. Consigliamo almeno una foto frontale a 3/4 (la preferita per l'animazione di testa), una laterale, una del retro e qualche dettaglio degli interni o del cruscotto." },
  { q: "L'AI rielabora anche le foto degli interni o solo gli esterni?", a: "La sostituzione dello sfondo fotorealistico 3D viene applicata con massima precisione sulla carrozzeria esterna. Per gli interni, l'AI applica correzione colore cinematografica, stabilizzazione e zoom dinamici mantenendo inalterata la fedeltà del veicolo." },
  { q: "I crediti video acquistati hanno una data di scadenza?", a: "Assolutamente no. Non applichiamo alcun abbonamento mensile vincolante. I crediti acquistati (1, 5 o 15 video) rimangono per sempre nel tuo saldo finché non decidi di utilizzarli." },
  { q: "Posso inserire il logo del mio autosalone e i miei contatti nel video?", a: "Sì, a partire dal piano PRO puoi caricare il logo trasparente (PNG/SVG) della tua concessionaria, che verrà integrato in sovrimpressione con animazione d'ingresso professionale, insieme a indirizzo, telefono e prezzo del veicolo." },
  { q: "In quali formati vengono esportati i video e dove posso pubblicarli?", a: "Puoi selezionare sia il formato Verticale (9:16), ottimizzato per Instagram Reels, TikTok, YouTube Shorts e Facebook Ads, sia il formato Orizzontale (16:9), ideale per le schede del tuo sito web e i portali di annunci (AutoScout24, Subito)." },
  { q: "Come funziona la voce narrante e in quali lingue parla?", a: "La nostra voce sintetica avanzata legge una sceneggiatura persuasiva generata sull'allestimento dell'auto. È disponibile in Italiano, Inglese, Tedesco e Spagnolo, perfetta per intercettare anche acquirenti esteri." },
  { q: "Cosa succede se un'auto viene venduta mentre sto usando il servizio?", a: "I crediti vengono scalati solo al momento del rendering effettivo. Se decidi di non promuovere un veicolo, il credito rimane intatto sul tuo profilo per la prossima vettura in arrivo nel salone." },
  { q: "Come funziona la prima generazione gratuita?", a: "Ti permettiamo di testare l'intera potenza della nostra regia AI su una prima vettura senza carta di credito. Carica le foto, inserisci l'email e guarda tu stesso il risultato prima di scegliere il tuo pacchetto." }
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

  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/orbit-template.html")
      .then((res) => res.text())
      .then((html) => { if (orbitContainerRef.current) orbitContainerRef.current.innerHTML = html; })
      .catch((err) => console.error("Errore orbit:", err));

    const interval = setInterval(() => setDemoStep(p => (p + 1) % 3), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const urlToken = new URLSearchParams(window.location.search).get("token");
      const savedToken = localStorage.getItem("ab_token");
      const tokenToUse = urlToken || savedToken;
      if (!tokenToUse) return;

      try {
        const res = await fetch(`${VERIFICA_TOKEN_URL}?token=${encodeURIComponent(tokenToUse)}&project=DriveMotion`);
        const parsedData = await res.json();
        if (parsedData.valido === true) {
          setIsPro(true);
          setToken(tokenToUse);
          setVideoRimanenti(parsedData.video_rimanenti ?? 0);
          if (parsedData.email) setEmail(parsedData.email);
          if (parsedData.nome) setAgencyName(parsedData.nome);
          if (parsedData.indirizzo) setAgencyAddress(parsedData.indirizzo);
          if (parsedData.telefono) setAgencyPhone(parsedData.telefono);
          localStorage.setItem("ab_token", tokenToUse);
        }
      } catch (err) { console.error("Verifica token:", err); }
    };
    checkToken();
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setSelectedVoice(VOICES_CONFIG[lang as keyof typeof VOICES_CONFIG][0].id);
  };

  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 8 - images.length);
    const compressImage = (file: File): Promise<string> =>
      new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const MAX_SIZE = 1080;
            let width = img.width;
            let height = img.height;
            if (width > MAX_SIZE || height > MAX_SIZE) {
              const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.95));
          };
        };
      });

    const compressed = await Promise.all(files.map(compressImage));
    setImages(prev => [...prev, ...compressed]);
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const processAndTrigger = async () => {
    if (images.length === 0 || !email) return;
    setLoadingVideo(true);
    setVideoCompleted(false);

    const englishPrompt = selectedEnvId === "custom" ? customEnv : PREDEFINED_ENVIRONMENTS.find(e => e.id === selectedEnvId)?.en || "";

    try {
      const logoPayload = (isPro && logo) ? logo : FALLBACK_LOGO_URL;
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: "auto",
          descrizione: `${carMake} ${carEngine} ${carYear}`,
          prezzo: carPrice,
          images,
          logo: logoPayload,
          email,
          formato: videoFormat,
          lingua: language,
          voice: selectedVoice,
          token,
          project: "DriveMotion",
          environment: englishPrompt,
          car_details: { make: carMake, price: carPrice, year: carYear, engine: carEngine },
          agency: { name: agencyName, address: agencyAddress, phone: agencyPhone },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "free_limit_reached") {
          alert(data.message);
          setShowProModal(true);
        } else {
          alert("Errore: " + (data.message || "Riprova più tardi"));
        }
        setLoadingVideo(false);
        return;
      }

      setLoadingVideo(false);
      setVideoCompleted(true);
      if (isPro) setVideoRimanenti(prev => Math.max(0, prev - 1));
    } catch {
      alert("Errore durante la generazione video.");
      setLoadingVideo(false);
    }
  };

  const checkEmailUsed = async (emailToCheck: string) => {
    if (!emailToCheck || !emailToCheck.includes("@") || isPro) return;
    try {
      const res = await fetch(`${CHECK_EMAIL_URL}?email=${encodeURIComponent(emailToCheck)}`);
      const data = await res.json();
      if (data.gia_usato === true) {
        setFreeUsed(true);
        alert("Hai già provato il servizio gratuitamente.\nScegli un pacchetto per continuare a creare video!");
        setShowProModal(true);
      }
    } catch (e) { console.error("Check email:", e); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative pt-20">
      
      {/* SFONDO VIDEO */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        <video src="/bg.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#050505]/75 to-[#050505]" />
      </div>

      <div className="relative z-10">
        <Navbar isPro={isPro} videoRimanenti={videoRimanenti} onOpenSupport={() => setShowSupportModal(true)} />
        <Hero demoStep={demoStep} />
        <Features />
        <VideoGeneratorForm 
          images={images} logo={logo} email={email} setEmail={setEmail}
          carMake={carMake} setCarMake={setCarMake} carPrice={carPrice} setCarPrice={setCarPrice}
          carYear={carYear} setCarYear={setCarYear} carEngine={carEngine} setCarEngine={setCarEngine}
          agencyName={agencyName} setAgencyName={setAgencyName} agencyAddress={agencyAddress} setAgencyAddress={setAgencyAddress}
          agencyPhone={agencyPhone} setAgencyPhone={setAgencyPhone} selectedEnvId={selectedEnvId} setSelectedEnvId={setSelectedEnvId}
          customEnv={customEnv} setCustomEnv={setCustomEnv} videoFormat={videoFormat} setVideoFormat={setVideoFormat}
          language={language} handleLanguageChange={handleLanguageChange} selectedVoice={selectedVoice} setSelectedVoice={setSelectedVoice}
          isPro={isPro} freeUsed={freeUsed} videoRimanenti={videoRimanenti} loadingVideo={loadingVideo} videoCompleted={videoCompleted}
          handleMultipleFileUpload={handleMultipleFileUpload} removeImage={removeImage} handleLogoUpload={handleLogoUpload} setLogo={setLogo}
          processAndTrigger={processAndTrigger} setShowProModal={setShowProModal} checkEmailUsed={checkEmailUsed}
          predefinedEnvironments={PREDEFINED_ENVIRONMENTS} voicesConfig={VOICES_CONFIG} languages={LANGUAGES}
        />
        <PricingSection email={email} />
        <FaqSection faqs={FAQS} />
        <EcosystemSection orbitContainerRef={orbitContainerRef} />
        <Footer onOpenSupport={() => setShowSupportModal(true)} />
      </div>

      <Modals showProModal={showProModal} setShowProModal={setShowProModal} showSupportModal={showSupportModal} setShowSupportModal={setShowSupportModal} />
      <Chatbot />
    </div>
  );
}
