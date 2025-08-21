import { NextRequest, NextResponse } from 'next/server';

interface Env {
  DB: D1Database;
}

function validateOrigin(request: NextRequest, env: Env): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  const allowedOrigins = [
    'https://privacypack.org',
  ];
  
  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }
  
  if (referer && !allowedOrigins.some(allowed => referer.startsWith(allowed))) {
    return false;
  }
  
  if (!origin && !referer) {
    return false;
  }
  
  return true;
}

// POST /api/apps/increment - Increment count for specific apps
export async function POST(request: NextRequest) {
  try {
    const env = process.env as unknown as Env;
    
    if (!validateOrigin(request, env)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    const { appIds } = await request.json() as { appIds: string[] };

    if (!Array.isArray(appIds) || appIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid app IDs' },
        { status: 400 }
      );
    }

    const validIds = appIds.filter(id => 
      typeof id === 'string' && 
      id.length <= 50 && 
      /^[a-zA-Z0-9_-]+$/.test(id)
    );

    if (validIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid app ID format' },
        { status: 400 }
      );
    }

    const results = [];
    for (const appId of validIds) {
      const result = await env.DB.prepare(`
        INSERT INTO apps (id, name, count) 
        VALUES (?, ?, 1)
        ON CONFLICT(id) DO UPDATE SET 
        count = count + 1
      `).bind(appId, appId).run();
      
      results.push(result);
    }
    
    const totalUpdated = results.filter(r => r.success).length;

    return NextResponse.json({
      success: true,
      updated: totalUpdated,
      apps: validIds
    });
  } catch (error) {
    console.error('Increment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to increment counts' },
      { status: 500 }
    );
  }
}