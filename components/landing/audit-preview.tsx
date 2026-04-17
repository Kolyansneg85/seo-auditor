import {
  CheckCircle2,
  AlertTriangle,
  Circle,
  TrendingUp,
  Gauge,
  FileText,
  Link2,
  ShieldCheck,
} from "lucide-react"

const categories = [
  { name: "Performance", score: 92 },
  { name: "SEO", score: 88 },
  { name: "Accessibility", score: 76 },
  { name: "Best Practices", score: 95 },
]

const issues = [
  { severity: "high", title: "5 pages missing meta descriptions", meta: "High impact" },
  { severity: "medium", title: "LCP over 2.5s on 3 product templates", meta: "Medium" },
  { severity: "low", title: "12 images without explicit width & height", meta: "Low" },
  { severity: "done", title: "Canonical tags configured correctly", meta: "Passed" },
]

const tabs = [
  { icon: Gauge, label: "Core Vitals" },
  { icon: FileText, label: "Content" },
  { icon: Link2, label: "Links" },
  { icon: ShieldCheck, label: "Security" },
]

export function AuditPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/10 ring-1 ring-black/5 dark:ring-white/5">
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" aria-hidden />
          <div className="ml-3 flex items-center gap-2 rounded-md border border-border/50 bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            app.seoauditor.com/report/acme-corp
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          {/* Score card */}
          <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/30 p-5 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Overall score
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                +22
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-bold tracking-tight tabular-nums text-foreground">87</span>
              <span className="text-xl font-medium text-muted-foreground">/100</span>
            </div>
            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="tabular-nums text-muted-foreground">{c.score}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border/80">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${c.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issues list */}
          <div className="rounded-xl border border-border/60 bg-muted/30 p-5 md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Action items</h3>
                <p className="text-xs text-muted-foreground">Ranked by impact on your rankings</p>
              </div>
              <span className="text-xs text-muted-foreground">4 of 23 shown</span>
            </div>
            <ul className="space-y-2">
              {issues.map((i, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/80 px-3 py-2.5"
                >
                  {i.severity === "high" && (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  )}
                  {i.severity === "medium" && (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  )}
                  {i.severity === "low" && <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                  {i.severity === "done" && (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{i.title}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{i.meta}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border/50 pt-4 text-center">
              {tabs.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat cards */}
      <div className="pointer-events-none absolute -left-4 -top-6 hidden rounded-xl border border-border/60 bg-card/95 px-4 py-3 shadow-lg backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Organic traffic
            </div>
            <div className="text-sm font-semibold text-foreground">+127% in 90 days</div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-4 -bottom-6 hidden rounded-xl border border-border/60 bg-card/95 px-4 py-3 shadow-lg backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Gauge className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              LCP improvement
            </div>
            <div className="text-sm font-semibold text-foreground">3.8s → 1.2s</div>
          </div>
        </div>
      </div>
    </div>
  )
}
