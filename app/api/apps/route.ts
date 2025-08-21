import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function validateOrigin(request: NextRequest, allowedOrigins: string[]): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }

  if (referer && !allowedOrigins.some((allowed) => referer.startsWith(allowed))) {
    return false;
  }

  if (!origin && !referer) {
    return false;
  }

  return true;
}

// GET /api/apps - Get all apps with counts
export async function GET(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();

    const allowedOrigins = env.ALLOWED_ORIGINS.split(",");
    if (!validateOrigin(request, allowedOrigins)) {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    const { results } = await env.DB.prepare(`
      SELECT id, count 
      FROM apps
    `).all();

    return NextResponse.json({
      success: true,
      apps: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error},
      { status: 500 }
    );
  }
}
