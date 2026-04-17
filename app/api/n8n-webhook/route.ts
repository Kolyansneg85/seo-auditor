import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Получаем URL из запроса
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 })
    }

    console.log("Отправка URL в n8n через прямой запрос:", url)

    // Создаем объект URLSearchParams для отправки данных в формате application/x-www-form-urlencoded
    const params = new URLSearchParams()
    params.append("Landing Page Url", url)

    // Отправляем запрос на webhook n8n
    const response = await fetch("https://n8n.getsync.ru/form/afe067a5-4878-4c9d-b746-691f77190f54", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    // Получаем ответ от n8n
    const responseText = await response.text()
    console.log("Ответ от n8n:", responseText)

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting to n8n:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
