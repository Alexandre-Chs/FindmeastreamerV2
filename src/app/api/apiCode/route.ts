import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const responseType = "code";
  const clientId = "3bczx9mqg6h7viwm1pfqs1yv5vs6yw";
  const redirectURI = "http://localhost:3000";
  const scope = "user:edit";
  const response = `https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`;
  return NextResponse.json({ message: response });
}
