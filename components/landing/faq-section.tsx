import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is the audit really free?",
    a: "Yes. Your first complete audit is free — no credit card, no trial timer, no gated paywall. We make money when teams upgrade for scheduled re-audits, historical tracking and multi-domain monitoring.",
  },
  {
    q: "How long does a full audit take?",
    a: "Most sites under 10,000 pages complete in under three minutes. Larger sites are crawled progressively — you'll receive preliminary findings as they're ready, and the full report within fifteen minutes.",
  },
  {
    q: "Which pages get analyzed?",
    a: "We crawl your public site starting from the URL you provide, following internal links and your sitemap. The free tier covers up to 1,000 URLs; paid plans extend this or run full-site audits on a schedule.",
  },
  {
    q: "What data do you collect and store?",
    a: "Only the public HTML, response headers and rendered DOM required to run the checks. We never log in, never submit forms, and never scrape personal or authenticated content. Reports are encrypted at rest and deleted on request.",
  },
  {
    q: "Can I share the report with my team?",
    a: "Yes. Every report has a signed, shareable link you can forward to developers, designers or leadership. Paid plans add workspace access with role-based permissions, comments and assignment tracking.",
  },
  {
    q: "How is this different from running Lighthouse?",
    a: "Lighthouse audits a single page. We crawl your whole site, correlate issues across templates, benchmark against competitors, and prioritize recommendations by expected traffic impact — not just a score.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Questions, answered
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Everything you need to know
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Still have questions? Drop us a note at hello@seoauditor.com and we&apos;ll get back within the business day.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12 divide-y divide-border/60 rounded-2xl border border-border/60 bg-card"
        >
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-0 px-6">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
