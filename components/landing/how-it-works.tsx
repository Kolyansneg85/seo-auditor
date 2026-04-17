import { Globe, Cpu, ClipboardList } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Drop in your URL",
    description:
      "Paste your homepage — or any entry point. Our crawler maps your entire public surface in seconds, respecting robots.txt and rate limits.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "We run 230+ checks in parallel",
    description:
      "Technical SEO, content quality, performance, structured data, accessibility and competitor benchmarks — all evaluated in a single pipeline.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "You get a prioritized action plan",
    description:
      "Not a CSV dump. A ranked, developer-ready report with expected impact, fix effort, and the exact pages or templates to update first.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From URL to action plan in three minutes
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Zero configuration. No integrations to install. No sales call. Just a direct line from your domain to a report your team can ship against this week.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <step.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-sm font-semibold tracking-wider text-muted-foreground/60">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
