import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const params = new URLSearchParams();
  if (
    process.env.CLIENT_ID &&
    process.env.CLIENT_SECRET &&
    process.env.GRANT_TYPE_APP
  ) {
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", process.env.GRANT_TYPE_APP);
  } else {
    console.error(".env not defined or missing .env element");
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await response.json();
  return NextResponse.json({ data: data });
}
