import React from "react";
import {
  ImageIcon, Plus, X, Upload, Lock, MapPin,
  Car, Building2, Volume2, Mail, Video, Loader2, CheckCircle2,
  Globe
} from "lucide-react";

interface FormProps {
  images: string[];
  logo: string | null;
  email: string;
  setEmail: (val: string) => void;
  carMake: string;
  setCarMake: (val: string) => void;
  carPrice: string;
  setCarPrice: (val: string) => void;
  carYear: string;
  setCarYear: (val: string) => void;
  carEngine: string;
  setCarEngine: (val: string) => void;
  agencyName: string;
  setAgencyName: (val: string) => void;
  agencyAddress: string;
  setAgencyAddress: (val: string) => void;
  agencyPhone: string;
  setAgencyPhone: (val: string) => void;
  selectedEnvId: string;
  setSelectedEnvId: (val: string) => void;
  customEnv: string;
  setCustomEnv: (val: string) => void;
  videoFormat: string;
  setVideoFormat: (val: string) => void;
  language: string;
  handleLanguageChange: (lang: string) => void;
  selectedVoice: string;
  setSelectedVoice: (val: string) => void;
  isPro: boolean;
  freeUsed: boolean;
  videoRimanenti: number;
  loadingVideo: boolean;
  videoCompleted: boolean;
  handleMultipleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLogo: (val: string | null) => void;
  processAndTrigger: () => void;
  setShowProModal: (val: boolean) => void;
  checkEmailUsed: (email: string) => void;
  predefinedEnvironments: { id: string; icon: string; it: string; en: string }[];
  voicesConfig: Record<string, { id: string; name: string; pro: boolean }[]>;
  languages: { id: string; flag: string; name: string }[];
}

export default function VideoGeneratorForm({
  images, logo, email, setEmail, carMake, setCarMake, carPrice, setCarPrice,
  carYear, setCarYear, carEngine, setCarEngine, agencyName, setAgencyName,
  agencyAddress, setAgencyAddress, agencyPhone, setAgencyPhone,
  selectedEnvId, setSelectedEnvId, customEnv, setCustomEnv,
  videoFormat, setVideoFormat, language, handleLanguageChange,
  selectedVoice, setSelectedVoice, isPro, freeUsed, videoRimanenti,
  loadingVideo, videoCompleted, handleMultipleFileUpload, removeImage,
  handleLogoUpload, setLogo, processAndTrigger, setShowProModal,
  checkEmailUsed, predefinedEnvironments, voicesConfig, languages
}: FormProps) {

  const btnLabel = () => {
    if (loadingVideo) return "Rendering Video in corso...";
    if (!isPro && freeUsed) return "Prova gratuita terminata 🔒";
    if (isPro && videoRimanenti === 0) return "Crediti esauriti — Rinnova il piano ⚠️";
    if (isPro) return `Genera Video (${videoRimanenti} crediti rimasti)`;
    return "Genera Video e Post Social GRATIS 🔥";
  };

  const btnDisabled =
    images.length === 0 || loadingVideo || !email.includes("@") ||
    (isPro && videoRimanenti === 0) || (!isPro && freeUsed);

  return (
    <section id="creatore" className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-white/10 justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <Globe className="text-slate-400" />
            <select value={language} onChange={e => handleLanguageChange(e.target.value)} className="bg-black border border-white/20 text-white rounded-lg px-4 py-2 outline-none focus:border-cyan-500 cursor-pointer">
              {languages.map(l => <option key={l.id} value={l.id}>{l.flag} {l.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Video className="text-slate-400" />
            <div className="flex bg-black rounded-lg p-1 border border-white/20">
              <button onClick={() => setVideoFormat("verticale")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${videoFormat === "verticale" ? "bg-white text-black font-bold" : "text-slate-400 hover:text-white"}`}>Verticale 9:16 (Reel)</button>
              <button onClick={() => setVideoFormat("orizzontale")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${videoFormat === "orizzontale" ? "bg-white text-black font-bold" : "text-slate-400 hover:text-white"}`}>Orizzontale 16:9</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-10">
            {/* 1. Immagini */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="text-cyan-400" /> 1. Immagini Veicolo (Max 8)
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20 bg-black group shadow-lg">
                    <img src={img} className="object-cover w-full h-full" alt="Uploaded car" />
                    <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {images.length < 8 && (
                  <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group">
                    <Plus size={24} className="text-slate-400 group-hover:text-cyan-400" />
                    <input type="file" multiple className="hidden" onChange={handleMultipleFileUpload} accept="image/*" />
                  </label>
                )}
              </div>

              <div
                onClick={!isPro ? () => setShowProModal(true) : undefined}
                className={`relative border-2 border-dashed rounded-2xl transition-all p-4 ${logo ? "border-cyan-500/50 bg-black/50" : "border-white/10 bg-black/40"} ${!isPro ? "opacity-50 cursor-pointer" : ""}`}
              >
                {!isPro && <div className="absolute top-2 right-2 text-red-400"><Lock size={14} /></div>}
                {!logo ? (
                  <label className={`flex flex-col items-center justify-center ${isPro ? "cursor-pointer" : ""}`}>
                    <Upload size={20} className="text-slate-500 mb-1" />
                    <span className="text-sm font-medium">Logo Autosalone (Incluso nel PRO)</span>
                    {isPro && <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/png,image/jpeg,image/webp" />}
                  </label>
                ) : (
                  <div className="relative h-12 flex items-center justify-center">
                    <img src={logo} className="max-h-full object-contain" alt="Logo preview" />
                    <button onClick={() => setLogo(null)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-red-600">
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Sfondo */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-purple-400" /> 2. Sfondo Magico AI
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {predefinedEnvironments.map(env => (
                  <button key={env.id} onClick={() => setSelectedEnvId(env.id)} className={`p-3 rounded-xl border text-xs text-left transition-all ${selectedEnvId === env.id ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]" : "border-white/10 bg-black/50 text-slate-400 hover:border-white/30"}`}>
                    {env.icon} {env.it}
                  </button>
                ))}
                <button onClick={() => setSelectedEnvId("custom")} className={`p-3 rounded-xl border text-xs text-left transition-all col-span-2 md:col-span-3 ${selectedEnvId === "custom" ? "border-purple-500 bg-purple-500/10 text-white" : "border-white/10 bg-black/50 text-slate-400"}`}>
                  ✍️ Scrivi tu lo sfondo...
                </button>
              </div>
              {selectedEnvId === "custom" && (
                <input type="text" placeholder="Es. Salone marmo bianco illuminato a giorno..." value={customEnv} onChange={e => setCustomEnv(e.target.value)} className="w-full mt-3 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-all text-white" />
              )}
            </div>
          </div>

          <div className="space-y-10">
            {/* 3. Dati Veicolo */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Car className="text-blue-400" /> 3. Dati Veicolo
              </h3>
              <div className="space-y-3">
                <input type="text" value={carMake} onChange={e => setCarMake(e.target.value)} placeholder="Marca e Modello (es. BMW Serie 3 M Sport)" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all text-white" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={carYear} onChange={e => setCarYear(e.target.value)} placeholder="Anno (es. 2023)" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all text-white" />
                  <input type="text" value={carPrice} onChange={e => setCarPrice(e.target.value)} placeholder="Prezzo (es. 34.900 €)" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all text-white" />
                </div>
                <input type="text" value={carEngine} onChange={e => setCarEngine(e.target.value)} placeholder="Motore / Alimentazione (es. 2.0d 190CV Mild-Hybrid)" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition-all text-white" />
              </div>
            </div>

            {/* 4. Autosalone & Voce */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="text-orange-400" /> 4. Autosalone & Voce
              </h3>
              <div className="space-y-3">
                <input type="text" value={agencyName} onChange={e => setAgencyName(e.target.value)} placeholder="Nome dell'Autosalone" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all text-white" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={agencyAddress} onChange={e => setAgencyAddress(e.target.value)} placeholder="Città / Sede" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all text-white" />
                  <input type="text" value={agencyPhone} onChange={e => setAgencyPhone(e.target.value)} placeholder="Telefono / WhatsApp" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all text-white" />
                </div>
                <div className="relative mt-2">
                  <select
                    value={selectedVoice}
                    onChange={e => setSelectedVoice(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 appearance-none cursor-pointer text-white"
                  >
                    {voicesConfig[language]?.map(v => (
                      <option key={v.id} value={v.id} disabled={v.pro && !isPro}>
                        {v.name} {v.pro && !isPro ? "🔒" : ""}
                      </option>
                    ))}
                  </select>
                  <Volume2 className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-12 pt-8 border-t border-white/10 max-w-2xl mx-auto relative z-10">
          <div className="mb-6 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-center">
            <span className="inline-block px-3 py-1 bg-cyan-500 text-black text-xs font-black uppercase tracking-widest rounded-full mb-3">
              ✨ REGIA AI INCLUSA
            </span>
            <p className="text-lg text-slate-300 leading-relaxed">
              Oltre al cambio sfondo, la nostra Intelligenza Artificiale trasformerà <strong>fino a {isPro ? '4' : '2'} foto in veri video in movimento</strong> (l&apos;auto che sfreccia sull&apos;asfalto o carrellate cinematiche nel salone).
            </p>
          </div>

          <div className="relative mb-4">
            <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
            <input
              type="email"
              placeholder="La tua Email per ricevere il video..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={e => checkEmailUsed(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white focus:border-cyan-500 outline-none shadow-inner transition-all"
            />
          </div>

          <button
            onClick={(e) => {
              if ((!isPro && freeUsed) || (isPro && videoRimanenti === 0)) {
                e.preventDefault();
                setShowProModal(true);
              } else {
                processAndTrigger();
              }
            }}
            disabled={btnDisabled}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-6 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(34,211,238,0.25)] transform active:scale-95 text-xl sm:text-2xl cursor-pointer"
          >
            {loadingVideo ? <Loader2 className="animate-spin" size={24} /> : <Video size={24} />}
            {btnLabel()}
          </button>
          {videoCompleted && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm font-medium bg-green-400/10 p-3 rounded-lg border border-green-400/20">
              <CheckCircle2 size={18} /> Inviato! Riceverai il video via email tra circa 3-5 minuti.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
