import { NextResponse } from 'next/server';

// Force static export for this API route
export const dynamic = 'force-static';

export async function GET() {
  try {
    // Basic health check - you can add more sophisticated checks here
    // like database connectivity, external service status, etc.
    
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  // Simple HEAD request for connectivity check
  return new NextResponse(null, { status: 200 });
} 