import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "username and password are required" },
        { status: 400 }
      );
    }

    const auth = await prisma.userAuth.findUnique({
      where: { username },
      include: { user: true },
    });

    if (!auth) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, auth.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({
      userId: auth.userId,
      firstName: auth.user.firstName,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}