"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

interface AuditFormProps {
  className?: string
  formId?: string
}

export function AuditForm({ className, formId }: AuditFormProps) {
  const [url, setUrl] = useState("https://")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || url === "https://") {
      toast({
        variant: "destructive",
        title: "URL is required",
        description: "Please enter the website URL for analysis.",
      })
      return
    }
    try {
      new URL(url)
    } catch {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid website URL (including https://).",
      })
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/submit-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        title: "Audit started",
        description: email
          ? `Results will be delivered to ${email} within a few minutes.`
          : "Check your inbox — results will arrive within a few minutes.",
      })
    } catch (err) {
      console.error("Error:", err)
      toast({
        variant: "destructive",
        title: "Could not start the audit",
        description: "Something went wrong on our side. Please try again in a moment.",
        action: (
          <ToastAction altText="Try again" onClick={() => submit(e)}>
            Try again
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      id={formId}
      onSubmit={submit}
      className={cn("w-full space-y-3", className)}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          type="url"
          required
          placeholder="https://yourdomain.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={(e) => {
            if (e.target.value === "https://") e.target.select()
          }}
          disabled={isLoading}
          className="h-12 rounded-xl border-border/60 bg-background px-4 text-base shadow-sm placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/15"
          aria-label="Website URL"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 rounded-xl bg-primary px-6 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-80"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Run free audit
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <Input
        type="email"
        placeholder="Work email (to receive the report)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        className="h-12 rounded-xl border-border/60 bg-background px-4 text-base shadow-sm placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/15"
        aria-label="Email address"
      />
      <p className="text-xs text-muted-foreground">
        Free. No credit card required. First report ready in under three minutes.
      </p>
    </form>
  )
}
