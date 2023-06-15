// import { NextResponse } from "next/server";

// export async function getCodeAPI() {
//   const responseType = "code";
//   const clientId = "3bczx9mqg6h7viwm1pfqs1yv5vs6yw";
//   const redirectURI = "http://localhost:3000";
//   const scope = "user:edit";
//   const response = await fetch(
//     `https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`
//   );
//   const data = await response.json();
//   return new NextResponse(data);
// }
