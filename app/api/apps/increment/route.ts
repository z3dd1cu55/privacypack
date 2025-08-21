import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// POST /api/apps/increment - Increment count for specific apps
export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();

    const { appIds } = (await request.json()) as { appIds: string[] };

    if (!Array.isArray(appIds) || appIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid app IDs" },
        { status: 400 }
      );
    }

    const validIds = appIds.filter(
      (id) =>
        typeof id === "string" &&
        id.length <= 50 &&
        /^[a-zA-Z0-9_-]+$/.test(id)
    );

    if (validIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid app ID format" },
        { status: 400 }
      );
    }

    const results = [];
    for (const appId of validIds) {
      const result = await env.DB.prepare(`
        INSERT INTO apps (id, count) 
        VALUES (?, 1)
        ON CONFLICT(id) DO UPDATE SET count = count + 1,
        updated_at = CURRENT_TIMESTAMP
      `).bind(appId).run();

      results.push(result);
    }

    const totalUpdated = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      updated: totalUpdated,
      apps: validIds,
    });
  } catch (error) {
    console.error("Increment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to increment counts" },
      { status: 500 }
    );
  }
}
