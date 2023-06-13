import { NextResponse } from "next/server";

export async function getCodeAPI(request: Request) {
  const responseType = "code";
  const clientId = "3bczx9mqg6h7viwm1pfqs1yv5vs6yw";
  const redirectURI = "http://localhost:3000";
  const scope = "user:edit";
  const res = await fetch(
    `https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`
  );
  const response = await res.json();
  return new Response(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
