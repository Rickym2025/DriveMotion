/**
 * DriveMotion AI - Live Pricing & Stripe On-The-Fly Checkout
 * RM Studio Universal Engine
 */

const SUPABASE_S2_URL = "https://jhijfulhntlhcytbhcly.supabase.co";
const SUPABASE_S2_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaWpmdWxobnRsaGN5dGJoY2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzcxODcsImV4cCI6MjA5ODMxMzE4N30.z062NW4ApClll-XWHH2ufmcCleBRNHUUdKO6FiLa0TQ";

export type DriveMotionPlanKey = "starter" | "pro" | "max";

export interface DriveMotionPlan {
  id: DriveMotionPlanKey;
  name: string;
  price: number;
}

// 1. Prezzi di Fallback Immediati (Zero Flicker)
export const DRIVEMOTION_PRICES: Record<DriveMotionPlanKey, DriveMotionPlan> = {
  starter: { id: "starter", name: "Starter Pack (1 Video HD)", price: 14.90 },
  pro:     { id: "pro",     name: "Pro Pack (5 Video HD)",     price: 59.00 },
  max:     { id: "max",     name: "Maxi Pack (15 Video HD)",   price: 129.00 }
};

// 2. Fetch Live da Supabase S2 (saas_pricing)
export async function getLivePricesDriveMotion(): Promise<Record<DriveMotionPlanKey, DriveMotionPlan>> {
  const currentPrices = { ...DRIVEMOTION_PRICES };

  try {
    const res = await fetch(`${SUPABASE_S2_URL}/rest/v1/saas_pricing?saas=eq.drivemotion&select=*`, {
      headers: {
        apikey: SUPABASE_S2_KEY,
        Authorization: `Bearer ${SUPABASE_S2_KEY}`
      },
      cache: "no-store"
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((row: { plan_id: string; price: number | string; name?: string }) => {
          const pid = (row.plan_id || "").toLowerCase() as DriveMotionPlanKey;
          if (currentPrices[pid]) {
            currentPrices[pid] = {
              ...currentPrices[pid],
              price: Number(row.price),
              name: row.name || currentPrices[pid].name
            };
          }
        });
      }
    }
  } catch (err) {
    console.warn("Utilizzo prezzi locali fallback DriveMotion:", err);
  }

  return currentPrices;
}

// 3. Dispatch Checkout On-The-Fly verso n8n
export async function avviaCheckoutDriveMotion(
  planKey: DriveMotionPlanKey,
  email?: string,
  priceOverride?: number
): Promise<void> {
  const plan = DRIVEMOTION_PRICES[planKey];
  if (!plan) return;

  const finalPrice = priceOverride !== undefined ? priceOverride : plan.price;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://drivemotion.rmstudio.app";

  const payload = {
    progetto: "DriveMotion",
    portal_type: "drivemotion",
    title: `DriveMotion AI • ${plan.name}`,
    price: finalPrice,
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
  const data: { url?: string; checkout_url?: string; session_url?: string } = await res.json();
  const redirectUrl = data.url || data.checkout_url || data.session_url;

  if (redirectUrl) {
    window.location.href = redirectUrl;
  } else {
    throw new Error("URL Stripe non valido");
  }
}
