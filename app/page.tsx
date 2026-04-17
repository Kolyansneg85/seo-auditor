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
        title: "URL не указан",
        description: "Пожалуйста, введите URL сайта для анализа",
      })
      return
    }

    try {
      new URL(url)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Некорректный URL",
        description: "Пожалуйста, введите корректный URL сайта (включая https://)",
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
        throw new Error(errorData.error || `Ошибка сервера: ${response.status}`)
      }

      toast({
        title: "Аудит запущен!",
        description: email
          ? `Результаты будут отправлены на ${email} в течение нескольких минут.`
          : "Результаты будут отправлены на вашу почту в течение нескольких минут.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Ошибка при запуске аудита",
        description: "Не удалось запустить SEO аудит. Пожалуйста, попробуйте позже.",
        action: (
          <ToastAction altText="Попробовать снова" onClick={() => handleSubmit(e)}>
            Попробовать снова
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Декоративные фоновые элементы */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Header с выбором темы */}
      {mounted && (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SEO Аудитор</h1>
            </div>

            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm p-1 rounded-full border border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("light")}
                className="rounded-full h-9 w-9"
                aria-label="Светлая тема"
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("dark")}
                className="rounded-full h-9 w-9"
                aria-label="Темная тема"
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
              <span className="text-xs font-medium text-primary">Анализируем ваш сайт</span>
            </div>

            {/* Заголовок */}
            <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-foreground">
              Получите <span className="gradient-text">SEO аудит</span> вашего сайта
            </h1>

            {/* Описание */}
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Проанализируем ваш сайт и выдадим детальный отчет с рекомендациями для улучшения позиций в поисковых системах
            </p>

            {/* Форма */}
            <div className="mx-auto max-w-2xl">
              <Card className="border-border/60 bg-card shadow-sm backdrop-blur-md p-8 rounded-2xl animate-scale-in">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium text-foreground">
                      URL вашего сайта
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
                      Email для получения отчета (необязательно)
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
                        Запуск аудита...
                      </>
                    ) : (
                      <>
                        Запустить SEO аудит
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
              Что включает <span className="gradient-text">SEO аудит</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Полный анализ вашего сайта по всем ключевым факторам ранжирования
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {/* Card 1 */}
            <Card className="border-border/60 bg-card shadow-sm p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4 group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Технический аудит</h3>
              <p className="text-sm text-muted-foreground">
                Анализ HTML-кода, метатегов, структуры, скорости загрузки и технических аспектов SEO
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="border-border/60 bg-card shadow-sm p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4 group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Контентный аудит</h3>
              <p className="text-sm text-muted-foreground">
                Оценка качества контента, релевантности ключевых слов, удобочитаемости и структурирования текста
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-white mb-4">
            Улучшите позиции вашего сайта
          </h2>
          <p className="text-lg text-white/80 text-pretty max-w-2xl mx-auto mb-8">
            Получите детальный отчет и рекомендации по оптимизации прямо сейчас
          </p>
          <Button
            className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Начать анализ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SEO Аудитор. Результаты отправляются на указанный Email.
          </p>
        </div>
      </footer>
    </main>
  )
}
