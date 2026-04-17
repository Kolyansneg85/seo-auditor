import {
  Gauge,
  Code2,
  Search,
  FileText,
  Link2,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Map,
  Eye,
  Zap,
  Users,
} from "lucide-react"

const features = [
  {
    icon: Gauge,
    title: "Core Web Vitals",
    description:
      "Real-user LCP, INP, CLS and TTFB measurements across every critical page template — not just the homepage.",
  },
  {
    icon: Code2,
    title: "Technical SEO",
    description:
      "Crawl errors, redirect chains, canonicals, hreflang, sitemaps and robots.txt — all validated against Google's latest guidelines.",
  },
  {
    icon: Search,
    title: "On-page optimization",
    description:
      "Title tags, meta descriptions, heading hierarchy and keyword distribution scored per URL, with rewrites suggested.",
  },
  {
    icon: FileText,
    title: "Content intelligence",
    description:
      "Topical coverage, readability, duplicate content and thin-page detection across your entire site.",
  },
  {
    icon: Link2,
    title: "Internal link graph",
    description:
      "Visualize link equity flow, orphan pages, and cluster strength across sections and templates.",
  },
  {
    icon: Smartphone,
    title: "Mobile experience",
    description:
      "Mobile-first rendering, tap-target spacing, font scaling and viewport configuration — all validated.",
  },
  {
    icon: ShieldCheck,
    title: "Security & trust",
    description:
      "HTTPS, mixed content, HSTS, CSP and referrer policy analyzed for the trust signals Google actually rewards.",
  },
  {
    icon: BarChart3,
    title: "Structured data",
    description:
      "Schema.org validation for Article, Product, FAQ, HowTo and 20+ other rich result types.",
  },
  {
    icon: Map,
    title: "Indexation coverage",
    description:
      "We compare what Google has indexed against what lives on your site — and flag every discrepancy.",
  },
  {
    icon: Eye,
    title: "Accessibility (a11y)",
    description:
      "WCAG 2.2 AA checks that directly affect ranking, conversion and user trust — not just compliance.",
  },
  {
    icon: Zap,
    title: "Performance budget",
    description:
      "Bundle size, third-party script impact and render-blocking resources — with specific fix suggestions.",
  },
  {
    icon: Users,
    title: "Competitor gap analysis",
    description:
      "Compare your structure, speed and content depth against the top three SERP competitors, page by page.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Everything analyzed
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            One audit. Every ranking factor that matters.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most tools check a dozen things and call it a day. We run the exact 230+ checks an enterprise SEO consultant would — then translate the findings into prioritized, developer-ready recommendations your team can ship this sprint.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-muted/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary/15 group-hover:ring-primary/30">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
