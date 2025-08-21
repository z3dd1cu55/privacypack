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

// GET /api/apps - Get all apps with counts
export async function GET(request: NextRequest) {
  try {
    const env = process.env as unknown as Env;
    
    if (!validateOrigin(request, env)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    const { results } = await env.DB.prepare(`
      SELECT id, name, count 
      FROM apps 
    `).all();

    return NextResponse.json({
      success: true,
      apps: results
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}