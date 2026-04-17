import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Получаем URL из запроса
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 })
    }

    console.log("Отладка n8n webhook с URL:", url)

    // Пробуем разные форматы отправки данных

    // 1. FormData
    const formData = new FormData()
    formData.append("Landing Page Url", url)

    // 2. URLSearchParams (application/x-www-form-urlencoded)
    const params = new URLSearchParams()
    params.append("Landing Page Url", url)

    // 3. JSON
    const jsonBody = JSON.stringify({ "Landing Page Url": url })

    // Отправляем запросы в разных форматах и собираем результаты
    const results = {
      formData: null,
      urlEncoded: null,
      json: null,
    }

    try {
      const formDataResponse = await fetch("https://n8n.getsync.ru/form/afe067a5-4878-4c9d-b746-691f77190f54", {
        method: "POST",
        body: formData,
      })
      results.formData = {
        status: formDataResponse.status,
        text: await formDataResponse.text(),
      }
    } catch (error) {
      results.formData = { error: String(error) }
    }

    try {
      const urlEncodedResponse = await fetch("https://n8n.getsync.ru/form/afe067a5-4878-4c9d-b746-691f77190f54", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })
      results.urlEncoded = {
        status: urlEncodedResponse.status,
        text: await urlEncodedResponse.text(),
      }
    } catch (error) {
      results.urlEncoded = { error: String(error) }
    }

    try {
      const jsonResponse = await fetch("https://n8n.getsync.ru/form/afe067a5-4878-4c9d-b746-691f77190f54", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      })
      results.json = {
        status: jsonResponse.status,
        text: await jsonResponse.text(),
      }
    } catch (error) {
      results.json = { error: String(error) }
    }

    return NextResponse.json({
      success: true,
      url,
      results,
    })
  } catch (error) {
    console.error("Error in debug-n8n:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
