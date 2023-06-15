import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authorizationHeader = request.headers.get("authorization");
  const clientId = process.env.CLIENT_ID;
  let data;
  if (
    typeof clientId === "string" &&
    typeof authorizationHeader === "string" &&
    clientId &&
    authorizationHeader
  ) {
    const headers = {
      Authorization: authorizationHeader,
      "Client-Id": clientId,
    };
    const getUser = await fetch("https://api.twitch.tv/helix/users", {
      headers: headers,
    });
    data = await getUser.json();
  }

  return NextResponse.json({ user: data.data[0] });
}
