import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createHash } from "crypto";

// POST /api/apps/increment - Increment count for specific apps
export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();

    const clientIP = request.headers.get("cf-connecting-ip") || "unknown";
    const ipHash = createHash("sha256").update(clientIP + env.IP_SALT).digest("hex");

    const ipCheck = await env.DB.prepare(`
      INSERT INTO ip_requests (ip_hash, count, last_request_at) 
      VALUES (?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(ip_hash) DO UPDATE SET 
        count = CASE 
          WHEN last_request_at < datetime('now', '-1 hours') THEN 1
          ELSE count + 1
        END,
        last_request_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      RETURNING count;
    `)
      .bind(ipHash)
      .first<{ count: number }>();

    if (ipCheck && ipCheck.count > 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Maximum 5 requests allowed per hour.",
        },
        { status: 429 }
      );
    }

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

    const placeholders = validIds.map(() => "(?, 1)").join(", ");
    const stmt = env.DB.prepare(`
      INSERT INTO apps (id, count) 
      VALUES ${placeholders}
      ON CONFLICT(id) DO UPDATE SET 
        count = apps.count + 1,
        updated_at = CURRENT_TIMESTAMP
    `);

    await stmt.bind(...validIds).run();

    return NextResponse.json({
      success: true,
      updated: validIds.length,
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
