const testimonials = [
  {
    quote:
      "We ran our first audit on a Friday afternoon, shipped the top five fixes by Monday, and saw a measurable lift in impressions within a week. No consultant engagement ever felt this tight.",
    author: "Maya Schneider",
    role: "Head of Growth",
    company: "Arclight Commerce",
  },
  {
    quote:
      "The prioritization is what makes this different. It doesn't just tell us every tiny thing that's wrong — it tells us what will actually move the needle this quarter.",
    author: "Daniel Okafor",
    role: "Senior SEO Lead",
    company: "Northwind Media",
  },
  {
    quote:
      "I've used every major SEO platform over the last decade. This is the first tool that outputs something my engineering team will actually read and ship against.",
    author: "Priya Ramasamy",
    role: "VP of Marketing",
    company: "Veltora Health",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-border/60 bg-muted/20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            From the teams who shipped the fixes
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Built for teams that actually ship
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
