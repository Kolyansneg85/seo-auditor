const stats = [
  { value: "12K+", label: "Sites audited this month" },
  { value: "230+", label: "Checks per report" },
  { value: "2m 40s", label: "Average report time" },
  { value: "94%", label: "Teams report ranking gains" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by in-house SEO teams and agencies worldwide
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center bg-card px-6 py-8 text-center"
            >
              <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
