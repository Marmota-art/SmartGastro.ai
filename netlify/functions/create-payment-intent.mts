import type { Config, Context } from "@netlify/functions";
import Stripe from "stripe";

// Preise werden hier serverseitig berechnet – der Browser liefert nur Artikel-IDs und Mengen.
// Muss mit COURSES in src/constants.tsx übereinstimmen.
const COURSE_PRICES: Record<string, { lessons: number; pricePerLesson: number }> = {
  "masterclass-qr": { lessons: 12, pricePerLesson: 9 },
  "ki-management": { lessons: 18, pricePerLesson: 12 },
  "digital-process": { lessons: 8, pricePerLesson: 12 },
};

function priceFor(itemId: string): number | null {
  for (const [courseId, course] of Object.entries(COURSE_PRICES)) {
    if (itemId === `${courseId}-bundle`) return (course.lessons - 1) * course.pricePerLesson;
    if (itemId.startsWith(`${courseId}-lesson-`)) return course.pricePerLesson;
  }
  return null;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const secretKey = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secretKey) return json({ error: "Kartenzahlung ist noch nicht aktiviert." }, 503);

  let items: { id: string; quantity: number }[];
  try {
    ({ items } = await req.json());
  } catch {
    return json({ error: "Ungültige Anfrage" }, 400);
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return json({ error: "Warenkorb ist leer oder ungültig" }, 400);
  }

  let totalChf = 0;
  for (const item of items) {
    const price = typeof item?.id === "string" ? priceFor(item.id) : null;
    const qty = Number(item?.quantity);
    if (price === null || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return json({ error: `Unbekannter Artikel: ${String(item?.id)}` }, 400);
    }
    totalChf += price * qty;
  }

  try {
    const stripe = new Stripe(secretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalChf * 100),
      currency: "chf",
      automatic_payment_methods: { enabled: true },
      metadata: { items: items.map((i) => `${i.id}x${i.quantity}`).join(",").slice(0, 500) },
    });
    return json({ clientSecret: paymentIntent.client_secret, amount: totalChf });
  } catch (error) {
    console.error("Stripe error", error);
    return json({ error: "Zahlung konnte nicht vorbereitet werden." }, 502);
  }
};

export const config: Config = {
  path: "/api/create-payment-intent",
};
