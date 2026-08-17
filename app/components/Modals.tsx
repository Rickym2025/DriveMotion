import React, { useState } from "react";
import { Lock, X, CheckCircle2, Loader2, Mail } from "lucide-react";

interface ModalsProps {
  showProModal: boolean;
  setShowProModal: (val: boolean) => void;
  showSupportModal: boolean;
  setShowSupportModal: (val: boolean) => void;
}

export default function Modals({
  showProModal,
  setShowProModal,
  showSupportModal,
  setShowSupportModal
}: ModalsProps) {
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);

  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSupportLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "9013a8d5-0901-42a0-b9e6-4c45553f960d");
    formData.append("subject", "Nuovo contatto da DriveMotion AI");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).then(r => r.json());

      if (res.success) {
        setSupportSuccess(true);
        setTimeout(() => {
          setShowSupportModal(false);
          setSupportSuccess(false);
        }, 3000);
      }
    } catch {
      alert("Errore nell'invio. Riprova.");
    } finally {
      setSupportLoading(false);
    }
  };

  return (
    <>
      {showProModal && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center px-4 backdrop-blur-md">
          <div className="bg-[#0a0a0c] border border-cyan-500/30 rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <Lock className="text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" size={48} />
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Sblocca il Potenziale</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">L&apos;inserimento del logo aziendale e le voci AI premium in lingua straniera sono disponibili esclusivamente con i piani a pagamento.</p>
            <div className="space-y-3">
              <a href="#prezzi" onClick={() => setShowProModal(false)} className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-600/20 text-center">Vedi i Piani</a>
              <button onClick={() => setShowProModal(false)} className="block w-full text-slate-500 hover:text-white py-2 font-bold text-sm transition-colors uppercase tracking-widest cursor-pointer">Chiudi</button>
            </div>
          </div>
        </div>
      )}

      {showSupportModal && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center px-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl">
            <button onClick={() => setShowSupportModal(false)} className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors z-10 cursor-pointer">
              <X size={28} />
            </button>
            {supportSuccess ? (
              <div className="bg-[#0a0a0c] border border-cyan-500/30 p-8 rounded-2xl text-center shadow-2xl">
                <CheckCircle2 size={48} className="text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <h4 className="text-white font-bold text-xl mb-1">Messaggio Inviato!</h4>
                <p className="text-slate-400 text-sm">Il nostro team ti risponderà il prima possibile.</p>
              </div>
            ) : (
              <div className="bg-[#0a0a0c]/90 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span> Scrivici
                </h3>
                <form onSubmit={handleSupportSubmit} className="grid sm:grid-cols-2 gap-5 text-left">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Il tuo Nome</label>
                    <input type="text" name="name" required className="w-full bg-black border border-white/10 text-white rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors" placeholder="Mario Rossi" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">La tua Email</label>
                    <input type="email" name="email" required className="w-full bg-black border border-white/10 text-white rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors" placeholder="mario@email.it" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Messaggio</label>
                    <textarea name="message" required rows={4} className="w-full bg-black border border-white/10 text-white rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors resize-none" placeholder="Come possiamo aiutarti?"></textarea>
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={supportLoading} className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 rounded-xl transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer">
                      {supportLoading ? <Loader2 className="animate-spin" size={20} /> : <Mail size={20} />}
                      {supportLoading ? "Invio in corso..." : "Invia Messaggio"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
