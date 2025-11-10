import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // لحذف الكوكي
  response.cookies.set("user", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  return response;
}
