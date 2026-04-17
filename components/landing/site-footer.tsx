import Link from "next/link"
import { Search } from "lucide-react"

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <Search className="h-[18px] w-[18px] text-primary" strokeWidth={2.25} />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">SEO Auditor</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The enterprise-grade SEO audit platform for teams that ship. Built for speed, designed for action.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-foreground">{col.heading}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SEO Auditor. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
