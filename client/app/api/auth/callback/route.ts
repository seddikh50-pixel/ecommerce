export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");


    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // تبادل الكود مع توكن من Google
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token as string;

    // جلب بيانات المستخدم من Google
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = await userInfoRes.json();

    if (!userInfoRes.ok) {
      console.error("User info error:", user);
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 500 }
      );
    }

    const jwt = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      given_name: user.given_name,
      family_name: user.family_name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.redirect("http://localhost:3000/account");

    response.cookies.set("user", jwt, {
      httpOnly : true,
      secure: false,          // ضروري: لا تستخدم HTTPS في localhost
      sameSite: "lax",        // أو "none" في حال عندك HTTPS
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
