"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sun, Moon, Search, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Home() {
  const [url, setUrl] = useState("https://")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || url === "https://") {
      toast({
        variant: "destructive",
        title: "URL is required",
        description: "Please enter the website URL for analysis",
      })
      return
    }

    try {
      new URL(url)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid website URL (including https://)",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          email: email || undefined,
          source: "seo_audit_interface",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      toast({
        title: "Audit started!",
        description: email
          ? `Results will be sent to ${email} within a few minutes.`
          : "Results will be sent to your email within a few minutes.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Error starting audit",
        description: "Failed to start SEO audit. Please try again later.",
        action: (
          <ToastAction altText="Try again" onClick={() => handleSubmit(e)}>
            Try again
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Header with theme toggle */}
      {mounted && (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SEO Auditor</h1>
            </div>

            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm p-1 rounded-full border border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("light")}
                className="rounded-full h-9 w-9"
                aria-label="Light theme"
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("dark")}
                className="rounded-full h-9 w-9"
                aria-label="Dark theme"
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Analyzing your website</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-foreground">
              Get an <span className="gradient-text">SEO audit</span> for your website
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              We&apos;ll analyze your website and provide a detailed report with recommendations to improve your search engine rankings
            </p>

            {/* Form */}
            <div className="mx-auto max-w-2xl">
              <Card className="border-border/60 bg-card shadow-sm backdrop-blur-md p-8 rounded-2xl animate-scale-in">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium text-foreground">
                      Your website URL
                    </label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onFocus={(e) => {
                        if (e.target.value === "https://") {
                          e.target.select()
                        }
                      }}
                      required
                      className="h-12 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Starting audit...
                      </>
                    ) : (
                      <>
                        Start SEO audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 sm:py-32 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4 text-foreground">
              What&apos;s included in <span className="gradient-text">SEO audit</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete analysis of your website based on all key ranking factors
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {/* Card 1 */}
            <Card className="border-border/60 bg-card shadow-sm p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4 group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Technical Audit</h3>
              <p className="text-sm text-muted-foreground">
                Analysis of HTML code, meta tags, structure, loading speed, and technical SEO aspects
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="border-border/60 bg-card shadow-sm p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4 group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Content Audit</h3>
              <p className="text-sm text-muted-foreground">
                Assessment of content quality, keyword relevance, readability, and text structure
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-white mb-4">
            Improve your website&apos;s rankings
          </h2>
          <p className="text-lg text-white/80 text-pretty max-w-2xl mx-auto mb-8">
            Get a detailed report and optimization recommendations right now
          </p>
          <Button
            className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SEO Auditor. Results are sent to the specified email.
          </p>
          </p>
        </div>
      </footer>
    </main>
  )
}
