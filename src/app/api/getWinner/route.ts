import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/getCurrentParticipants"
    );
    const currentParticipants = await response.json();
    return NextResponse.json({ currentParticipants: currentParticipants });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error when get current participants",
    });
  }
}
