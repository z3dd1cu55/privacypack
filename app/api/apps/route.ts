import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// GET /api/apps - Get all apps with counts
export async function GET() {
  try {
    const { env } = getCloudflareContext();

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
      { success: false, error },
      { status: 500 }
    );
  }
}
