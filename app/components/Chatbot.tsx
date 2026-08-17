import React, { useEffect } from "react";

const CHATBOT_WEBHOOK_URL = "https://n8n.rmstudio.app/webhook/drivemotion-chat";

export default function Chatbot() {
  useEffect(() => {
    let chatSessionId = localStorage.getItem("dm_chat_session") ||
      "dm_" + Math.random().toString(36).substring(7);
    localStorage.setItem("dm_chat_session", chatSessionId);

    const container = document.getElementById("chatbot-container");
    if (!container) return;

    container.innerHTML = `
      <style>
        #dm-bubble { position:fixed; bottom:30px; left:30px; width:65px; height:65px; border-radius:50%; background:#06b6d4; box-shadow:0 10px 25px rgba(6,182,212,0.4); cursor:pointer; z-index:9999; display:flex; align-items:center; justify-content:center; border:2px solid #161616; transition:transform 0.3s; }
        #dm-bubble:hover { transform:scale(1.1); }
        #dm-window { position:fixed; bottom:110px; left:30px; width:380px; height:580px; min-width:300px; min-height:400px; max-width:90vw; max-height:80vh; background:#0a0a0c; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.8); z-index:9999; display:none; flex-direction:column; overflow:hidden; font-family:sans-serif; border:1px solid rgba(6,182,212,0.2); transition:opacity 0.3s ease,transform 0.3s ease; opacity:0; transform:translateY(20px); resize:both; }
        .dm-header { background:#161616; border-bottom:1px solid rgba(6,182,212,0.2); color:#fff; padding:16px 20px; font-weight:700; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .dm-messages { flex:1; padding:20px; overflow-y:auto; background:#050505; display:flex; flex-direction:column; gap:14px; }
        .dm-chips { display:flex; flex-wrap:wrap; gap:8px; padding:10px 20px; background:#050505; border-top:1px solid rgba(255,255,255,0.05); flex-shrink:0; }
        .dm-chip { background:#161616; border:1px solid rgba(6,182,212,0.3); color:#22d3ee; padding:8px 12px; border-radius:15px; font-size:12px; cursor:pointer; transition:0.2s; white-space:nowrap; }
        .dm-chip:hover { background:#06b6d4; color:#000; }
        .dm-msg { padding:12px 16px; border-radius:15px; font-size:14px; max-width:85%; line-height:1.5; }
        .dm-msg.bot { background:#161616; color:#f0f0f0; align-self:flex-start; border-bottom-left-radius:2px; border:1px solid rgba(255,255,255,0.05); }
        .dm-msg.user { background:#06b6d4; color:#000; align-self:flex-end; border-bottom-right-radius:2px; font-weight:500; }
        .dm-input-area { padding:15px; border-top:1px solid rgba(6,182,212,0.2); display:flex; gap:8px; background:#161616; flex-shrink:0; }
        .dm-input-area input { flex:1; border:1px solid #333; border-radius:8px; padding:8px 12px; background:#000; color:#fff; outline:none; font-size:14px; }
        .dm-input-area button { background:#06b6d4; border:none; border-radius:8px; color:#000; font-weight:bold; padding:0 15px; cursor:pointer; }
        .typing-dot { width:4px; height:4px; background:#06b6d4; border-radius:50%; display:inline-block; animation:typing 1.4s infinite; margin-right:2px; }
        @keyframes typing { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      </style>

      <div id="dm-bubble" title="Parla con Aurora">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>

      <div id="dm-window">
        <div class="dm-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:10px;height:10px;border-radius:50%;background:#22c55e;"></div>
            <span>Aurora AI • Receptionist</span>
          </div>
          <button id="close-chat" style="background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer;line-height:1;">&times;</button>
        </div>
        <div id="dm-messages" class="dm-messages">
          <div class="dm-msg bot">Ciao! Sono <b>Aurora</b>. 🏎️<br><br>Sapevi che i video con <b>cambio sfondo AI</b> e movimento 3D aumentano le richieste di contatto del <b>200%</b>?<br><br>Come posso aiutarti a valorizzare il tuo parco auto?</div>
        </div>
        <div id="dm-chips-container" class="dm-chips">
          <div class="dm-chip" data-msg="Come funziona il cambio sfondo?">Come funziona lo sfondo?</div>
          <div class="dm-chip" data-msg="Quali sono i prezzi dei pacchetti?">Prezzi pacchetti</div>
          <div class="dm-chip" data-msg="Come si attiva la prova gratis?">Prova Gratuita</div>
        </div>
        <div class="dm-input-area">
          <input type="text" id="dm-input" placeholder="Chiedi pure ad Aurora...">
          <button id="send-btn">Invia</button>
        </div>
      </div>
    `;

    const bubble        = document.getElementById("dm-bubble")!;
    const win           = document.getElementById("dm-window")!;
    const closeBtn      = document.getElementById("close-chat")!;
    const input         = document.getElementById("dm-input") as HTMLInputElement;
    const sendBtn       = document.getElementById("send-btn")!;
    const chipsContainer= document.getElementById("dm-chips-container")!;

    const toggleChat = (forceOpen = false) => {
      const isHidden = win.style.display === "none" || win.style.display === "";
      if (forceOpen || isHidden) {
        win.style.display = "flex";
        setTimeout(() => { win.style.opacity = "1"; win.style.transform = "translateY(0)"; }, 10);
      } else {
        win.style.opacity = "0"; win.style.transform = "translateY(20px)";
        setTimeout(() => { win.style.display = "none"; }, 300);
      }
    };

    const addMsg = (text: string, sender: "bot" | "user", id?: string) => {
      const div = document.createElement("div");
      div.className = `dm-msg ${sender}`;
      if (id) div.id = id;
      div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
      const box = document.getElementById("dm-messages")!;
      box.appendChild(div);
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    };

    const sendMsg = async (textOverride?: string) => {
      const text = textOverride || input.value.trim();
      if (!text) return;
      input.value = "";
      chipsContainer.style.display = "none";
      addMsg(text, "user");
      const loadingId = "loading-" + Date.now();
      addMsg('<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>', "bot", loadingId);
      try {
        const res  = await fetch(`${CHATBOT_WEBHOOK_URL}?message=${encodeURIComponent(text)}&sessionId=${chatSessionId}`, { method: "POST" });
        const data = await res.json();
        document.getElementById(loadingId)?.remove();
        addMsg(data.response || "Scusami, riprova.", "bot");
      } catch {
        document.getElementById(loadingId)?.remove();
        addMsg("Errore di connessione con il server.", "bot");
      }
    };

    document.querySelectorAll(".dm-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const msg = chip.getAttribute("data-msg");
        if (msg) sendMsg(msg);
      });
    });

    bubble.onclick   = () => toggleChat();
    closeBtn.onclick = () => toggleChat();
    sendBtn.onclick  = () => sendMsg();
    input.onkeypress = (e) => { if (e.key === "Enter") sendMsg(); };

    setTimeout(() => {
      if (window.innerWidth > 900) {
        toggleChat(true);
      }
    }, 1500);
  }, []);

  return <div id="chatbot-container" />;
}
