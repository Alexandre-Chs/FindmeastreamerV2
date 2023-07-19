import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const bearerAppToken = request.nextUrl.searchParams.get("bearer");
  if (process.env.CLIENT_ID) {
    const headers = {
      Authorization: `Bearer ${bearerAppToken}`,
      "Client-Id": process.env.CLIENT_ID,
    };

    const apiUrl = `https://api.twitch.tv/helix/streams?language=${lang}&first=100`;
    const getStream = await fetch(apiUrl, { headers });
    const responseData = await getStream.json();
    return NextResponse.json({ user: responseData });
  }
}
