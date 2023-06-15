import { NextResponse } from "next/server";

export async function GET() {
  const responseType = process.env.RESPONSE_TYPE;
  const clientId = process.env.CLIENT_ID;
  const redirectURI = process.env.REDIRECT_URI;
  const scope = process.env.SCOPE;
  const response = `https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`;
  return NextResponse.json({ message: response });
}

export async function POST(request: Request) {
  const res = await request.json();
  const code = res.code;

  const params = new URLSearchParams();
  if (
    process.env.CLIENT_ID &&
    process.env.CLIENT_SECRET &&
    process.env.GRANT_TYPE &&
    process.env.REDIRECT_URI
  ) {
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("code", code);
    params.append("grant_type", process.env.GRANT_TYPE);
    params.append("redirect_uri", process.env.REDIRECT_URI);
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
