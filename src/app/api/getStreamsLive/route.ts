import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const login = request.nextUrl.searchParams.get("login");
  // const bearerAppToken = request.nextUrl.searchParams.get("bearer");
  // if (process.env.CLIENT_ID) {
  //   const headers = {
  //     Authorization: `Bearer ${bearerAppToken}`,
  //     "Client-Id": process.env.CLIENT_ID,
  //   };
  //   const apiUrl = `https://api.twitch.tv/helix/streams?user_login=${login}`;
  //   const getStream = await fetch(apiUrl, { headers });
  //   const responseData = await getStream.json();
  //   // Traitez les données de la réponse selon vos besoins
  //   return NextResponse.json({ user: responseData });
  // }
}
