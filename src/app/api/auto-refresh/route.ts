import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Auto-refresh news every 10 minutes
let refreshInterval: NodeJS.Timeout | null = null;

async function refreshNews() {
  try {
    console.log('🔄 Auto-refreshing news...');
    const response = await fetch(`${process.env.NEXTJS_URL || 'https://24365.news'}/api/refresh-news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Auto-refresh successful: ${data.totalStories} stories`);
    } else {
      console.error('❌ Auto-refresh failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Auto-refresh error:', error);
  }
}

export async function POST() {
  try {
    // Clear existing interval
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    // Start new interval (10 minutes = 600,000ms)
    refreshInterval = setInterval(refreshNews, 10 * 60 * 1000);

    // Do initial refresh
    await refreshNews();

    return NextResponse.json({
      success: true,
      message: 'Auto-refresh started - will update every 10 minutes',
      intervalMs: 10 * 60 * 1000
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    return NextResponse.json({ success: true, message: 'Auto-refresh stopped' });
  }
  return NextResponse.json({ success: false, message: 'No auto-refresh running' });
}

export async function GET() {
  return NextResponse.json({
    isRunning: refreshInterval !== null,
    intervalMinutes: 10,
    message: 'Auto-refresh status'
  });
}