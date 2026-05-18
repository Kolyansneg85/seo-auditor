"use client"

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpsellCardProps {
  auditId: string
  email: string
}

const PAY_BASE_URL = process.env.NEXT_PUBLIC_PAY_BASE_URL || "https://pay.aigeniy.com"

export function UpsellCard({ auditId, email }: UpsellCardProps) {
  const handleClick = (plan: "enterprise" | "enterprise_pro") => {
    const returnUrl = typeof window !== "undefined"
      ? `${window.location.origin}/audit/${auditId}?token=${new URLSearchParams(window.location.search).get("token")}`
      : ""

    const params = new URLSearchParams({
      product: "seo_audit",
      plan,
      email,
      audit_id: auditId,
      return_url: returnUrl,
    })

    window.location.href = `${PAY_BASE_URL}/?${params.toString()}`
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card overflow-hidden">
      <div className="bg-primary/5 border-b border-border/60 px-8 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
          Unlock Full Report
        </p>
        <h2 className="text-2xl font-bold sm:text-3xl">
          You're seeing 6 of many more findings
        </h2>
        <p className="mt-2 text-muted-foreground">
          Our multi-model AI consensus found dozens more issues affecting your rankings. Unlock the full report with prioritized action plan.
        </p>
      </div>

      <div className="grid gap-px bg-border/60 md:grid-cols-2">
        {/* Enterprise */}
        <div className="bg-card p-8">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-bold">$99</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>3 AI models analyze tech (Kimi + Claude + Gemini)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>3 AI models analyze content</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>15+ technical findings with code snippets</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>15+ content findings prioritized</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>Permanent access</span>
            </li>
          </ul>
          <Button
            onClick={() => handleClick("enterprise")}
            className="mt-8 w-full h-12 rounded-xl"
          >
            Get Enterprise <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Enterprise Pro */}
        <div className="bg-card p-8 relative">
          <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            BEST VALUE
          </div>
          <h3 className="text-xl font-semibold">Enterprise Pro</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-bold">$249</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span><strong>Everything in Enterprise</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>Private GitHub repository</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>15-30 ready-to-assign issues</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>Developer-ready action tickets</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span>Auto-invite via your email</span>
            </li>
          </ul>
          <Button
            onClick={() => handleClick("enterprise_pro")}
            className="mt-8 w-full h-12 rounded-xl bg-primary"
          >
            Get Enterprise Pro <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-border/60 px-8 py-4 text-center text-xs text-muted-foreground">
        Pay with USDT on Polygon. 0% fees. Report unlocks automatically after payment.
      </div>
    </div>
  )
}
