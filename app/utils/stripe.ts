export const DRIVEMOTION_PRICES = {
  starter: { id: "starter", name: "Starter Pack (1 Video HD)", price: 14.90 },
  pro:     { id: "pro",     name: "Pro Pack (5 Video HD)",     price: 59.00 },
  max:     { id: "max",     name: "Maxi Pack (15 Video HD)",   price: 129.00 }
};

export async function avviaCheckoutDriveMotion(
  planKey: "starter" | "pro" | "max",
  email?: string
) {
  const plan = DRIVEMOTION_PRICES[planKey];
  if (!plan) return;

  const origin = typeof window !== "undefined" ? window.location.origin : "https://drivemotion.rmstudio.app";

  const payload = {
    progetto: "DriveMotion",
    portal_type: "drivemotion",
    title: `DriveMotion AI • ${plan.name}`,
    price: plan.price,
    ricarica_tipo: planKey,
    email: email || undefined,
    agency_id: email ? `lead_${email}` : "checkout_diretto",
    project_id: email ? `lead_${email}` : "checkout_diretto",
    origin: origin,
    success_url: `${origin}/?success=true&plan=${planKey}`,
    cancel_url: `${origin}/#prezzi`
  };

  const res = await fetch("https://n8n.rmstudio.app/webhook/crea-sessione-stripe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Errore sessione");
  const data = await res.json();
  const redirectUrl = data.url || data.checkout_url || data.session_url;

  if (redirectUrl) {
    window.location.href = redirectUrl;
  } else {
    throw new Error("URL Stripe non valido");
  }
}
