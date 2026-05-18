import { NextRequest, NextResponse } from "next/server"

const N8N_WEBHOOK_URL =
  process.env.N8N_AUDIT_FREE_WEBHOOK_URL ||
  "https://n8n.aigeniy.com/webhook/audit-free-v2"

// Простая in-memory rate limit: 5 запросов с одного IP за 10 минут
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 min
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) return false
  record.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, email, source } = body

    // Validation
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    try {
      const parsed = new URL(url)
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid protocol")
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      )
    }

    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in 10 minutes." },
        { status: 429 }
      )
    }

    // Proxy to n8n
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url.trim(),
        email: email?.trim() || "noreply@audit.aigeniy.com",
        source: source || "audit.aigeniy.com",
      }),
    })

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text()
      console.error("n8n webhook failed:", n8nResponse.status, errorText)
      return NextResponse.json(
        { error: "Audit service temporarily unavailable" },
        { status: 502 }
      )
    }

    const data = await n8nResponse.json()

    // n8n возвращает: { success, audit_id, magic_url, message }
    return NextResponse.json({
      success: true,
      audit_id: data.audit_id,
      magic_url: data.magic_url,
      message: data.message,
    })
  } catch (error) {
    console.error("submit-audit error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
