import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  return NextResponse.json({
    image: "https://placehold.co/600x400/0f172a/67e8f9?text=ComCelo+Frame",
    post_url: `${origin}/api/frames/start`,
    buttons: [
      { label: "Start Duel", action: "post" },
      { label: "Spectate", action: "post" }
    ],
    input: { text: "Enter opponent address" },
    metadata: {
      title: "ComCelo Frame"
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    ok: true,
    message: "Frame action received (placeholder)",
    received: body
  });
}
