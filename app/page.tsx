"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sun, Moon, Search, Loader2 } from "lucide-react"
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

  // Предотвращаем гидратацию
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

    // Валидация URL
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
      // Отправляем данные на webhook n8n
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

      // Успешный ответ
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      {mounted && (
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("light")}
            className="rounded-full h-10 w-10 flex items-center justify-center"
            aria-label="Светлая тема"
          >
            <Sun className="h-5 w-5 text-yellow-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("dark")}
            className="rounded-full h-10 w-10 flex items-center justify-center"
            aria-label="Темная тема"
          >
            <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </Button>
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto">
        <Card className="w-full backdrop-blur-md bg-background/70 border border-muted/30 shadow-lg rounded-3xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="h-16 w-16 rounded-2xl bg-[#FF9100] flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">SEO Аудитор</h1>
              <p className="text-muted-foreground max-w-md">
                Проанализируйте свой сайт и получите детальный SEO-аудит для улучшения позиций в Google
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  URL вашего сайта
                </label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={(e) => {
                    // Выделяем весь текст при фокусе, если это "https://"
                    if (e.target.value === "https://") {
                      e.target.select()
                    }
                  }}
                  required
                  className="h-14 px-4 rounded-xl border-muted/50 bg-background/50 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email для получения отчета (необязательно)
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-4 rounded-xl border-muted/50 bg-background/50 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-xl bg-[#FF9100] hover:bg-[#FF9100]/90 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Запуск аудита...
                  </>
                ) : (
                  "Запустить SEO аудит"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Результаты аудита будут отправлены на указанную электронную почту</p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Что включает SEO аудит?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 backdrop-blur-md bg-background/70 border border-muted/30 rounded-2xl">
              <h3 className="font-medium mb-2">Технический аудит</h3>
              <p className="text-sm text-muted-foreground">
                Анализ HTML-кода, метатегов, структуры и технических аспектов SEO
              </p>
            </Card>
            <Card className="p-6 backdrop-blur-md bg-background/70 border border-muted/30 rounded-2xl">
              <h3 className="font-medium mb-2">Контентный аудит</h3>
              <p className="text-sm text-muted-foreground">Оценка качества контента, ключевых слов и удобочитаемости</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
