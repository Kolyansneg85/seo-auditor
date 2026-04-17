import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Получаем данные из запроса
    const data = await request.json()
    const { url, email, source } = data

    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 })
    }

    console.log("Отправка данных в n8n webhook:", { url, email, source })

    // Отправляем запрос на webhook n8n
    const response = await fetch("https://n8n.aigeniy.com/webhook/seo-audit-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        email,
        source: source || "seo_audit_interface",
      }),
    })

    // Получаем ответ от n8n
    const responseText = await response.text()
    console.log("Ответ от n8n webhook:", response.status, responseText)

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`)
    }

    return NextResponse.json({
      success: true,
      message: "SEO audit started successfully",
      email: email || "default email",
    })
  } catch (error) {
    console.error("Error submitting audit:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    )
  }
}
