import { NextResponse } from "next/server";

const LIMITS = { name: 100, email: 200, message: 2000 };

/** Best-effort in-memory throttle (per server instance). */
const hits = new Map<string, { count: number; at: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  // strip control characters, then trim and cap length
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const message = clean(payload.message, LIMITS.message);

  const errors: string[] = [];
  if (name.length < 2) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("A valid email is required.");
  if (message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.at > WINDOW_MS) {
    hits.set(ip, { count: 1, at: now });
  } else {
    entry.count += 1;
    if (entry.count > MAX_HITS) {
      return NextResponse.json(
        { ok: false, error: "Too many messages - please try again shortly." },
        { status: 429 },
      );
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "The contact endpoint is not configured on this site yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: "portfolio-contact-form",
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Network error while delivering the message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
