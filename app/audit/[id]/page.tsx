import { notFound } from "next/navigation"
import { AuditReport } from "@/components/audit-report"
import { UpsellCard } from "@/components/upsell-card"

async function fetchAudit(auditId: string, token: string) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  console.log("SUPABASE_URL:", supabaseUrl ? "SET" : "MISSING")
  console.log("SUPABASE_ANON_KEY:", supabaseKey ? `SET (length: ${supabaseKey.length}, starts: ${supabaseKey.slice(0, 5)})` : "MISSING")
  console.log("audit_id:", auditId)
  console.log("token length:", token?.length)

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars!")
    return null
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/get_audit_by_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          p_audit_id: auditId,
          p_token: token,
        }),
        cache: "no-store",
      }
    )

    console.log("Supabase response status:", response.status)
    const text = await response.text()
    console.log("Supabase response body:", text.slice(0, 500))

    if (!response.ok) return null

    const data = JSON.parse(text)
    console.log("Parsed data length:", Array.isArray(data) ? data.length : "not array")
    return Array.isArray(data) && data.length > 0 ? data[0] : null
  } catch (err) {
    console.error("fetchAudit failed:", err)
    return null
  }
}

export default async function AuditPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { token?: string; paid?: string }
}) {
  const { id } = params
  const { token } = searchParams

  if (!token) {
    notFound()
  }

  const audit = await fetchAudit(id, token)

  if (!audit) {
    notFound()
  }

  if (audit.status === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Report Expired</h1>
          <p className="text-muted-foreground mb-6">
            This free audit was valid for 30 days and is no longer available.
          </p>
          <a
            href="/"
            className="inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Run a new audit
          </a>
        </div>
      </div>
    )
  }

  if (audit.status === "processing" || audit.status === "pending_payment") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-block animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
          <h1 className="text-2xl font-bold mb-3">Audit in progress</h1>
          <p className="text-muted-foreground mb-4">
            Multi-model AI is analyzing your site. This page will update automatically.
          </p>
          <p className="text-sm text-muted-foreground">
            You can safely close this page — we&apos;ll email you when it&apos;s ready.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {audit.report_tier === "free"
              ? "Free Audit"
              : audit.report_tier === "enterprise_pro"
              ? "Enterprise Pro"
              : "Enterprise"}
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            SEO Audit Report
          </h1>
          <a
            href={audit.target_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-muted-foreground hover:text-primary transition-colors"
          >
            {audit.target_url} →
          </a>
        </header>

        <AuditReport audit={audit} />

        {audit.report_tier === "free" && (
          <div className="mt-16">
            <UpsellCard auditId={audit.id} email={audit.target_email} />
          </div>
        )}
      </div>
    </div>
  )
}
