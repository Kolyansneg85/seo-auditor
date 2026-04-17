import { ArrowRight, Sparkles } from "lucide-react"
import { AuditForm } from "./audit-form"
import { AuditPreview } from "./audit-preview"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-24 sm:pt-20 sm:pb-32">
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              New
            </span>
            <span className="text-muted-foreground">AI-powered recommendations engine</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </a>

          <h1 className="text-balance text-4xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Know exactly why your site{" "}
            <span className="text-primary">isn&apos;t ranking</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A comprehensive SEO audit that goes beyond surface-level checks. We analyze 230+ ranking factors, surface the issues that actually move your traffic, and hand your team a prioritized action plan — all in under three minutes.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <AuditForm formId="hero-audit-form" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              No signup required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Unlimited pages crawled
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              SOC 2 ready infrastructure
            </span>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <AuditPreview />
        </div>
      </div>
    </section>
  )
}
