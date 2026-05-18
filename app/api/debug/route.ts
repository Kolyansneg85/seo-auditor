import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY

  // Берём тестовый audit_id и token из query string
  // Пример: /api/debug?id=b30d39b6-...&token=1c25fec6-...
  const u = new URL(req.url)
  const auditId = u.searchParams.get("id")
  const token = u.searchParams.get("token")

  if (!auditId || !token) {
    return NextResponse.json({
      error: "Pass ?id=...&token=... in query string",
      env: {
        has_url: !!url,
        url_value: url || null,
        has_key: !!key,
        key_length: key?.length || 0,
      },
    })
  }

  const rpcUrl = `${url}/rest/v1/rpc/get_audit_by_token`

  let rpcResponse, rpcStatus, rpcBody, parsed = null
  try {
    rpcResponse = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key!,
        Authorization: `Bearer ${key!}`,
      },
      body: JSON.stringify({
        p_audit_id: auditId,
        p_token: token,
      }),
      cache: "no-store",
    })
    rpcStatus = rpcResponse.status
    rpcBody = await rpcResponse.text()
    try { parsed = JSON.parse(rpcBody) } catch {}
  } catch (e: any) {
    return NextResponse.json({
      stage: "fetch_failed",
      error: e?.message || String(e),
    })
  }

  return NextResponse.json({
    rpc_url: rpcUrl,
    rpc_status: rpcStatus,
    rpc_ok: rpcResponse.ok,
    rpc_body_raw: rpcBody,
    rpc_body_parsed: parsed,
    rpc_is_array: Array.isArray(parsed),
    rpc_array_length: Array.isArray(parsed) ? parsed.length : null,
  })
}
