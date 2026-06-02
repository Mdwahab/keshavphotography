import { NextResponse } from "next/server";
import * as jose from "jose";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "keshav0101";
    const validPassword = process.env.ADMIN_PASSWORD || "keshav@1010";

    if (username === validUsername && password === validPassword) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "keshav-photography-super-secret-key-2024");
      
      const token = await new jose.SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
