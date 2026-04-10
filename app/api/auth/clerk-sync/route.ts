import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}

export async function POST(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  try {
    const { clerkId, firstName, lastName, email } = await request.json()

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: 'clerkId and email are required' },
        { status: 400, headers }
      )
    }

    // Check if user already exists by clerkId
    const existingAuth = await prisma.userAuth.findUnique({
      where: { clerkId },
      include: { user: true },
    })

    if (existingAuth) {
      return NextResponse.json({ user: existingAuth.user }, { headers })
    }

    // Create new user directly
    const newProfile = await prisma.userProfile.create({
      data: {
        firstName: firstName || '',
        lastName: lastName || '',
        email,
        auth: {
          create: { clerkId },
        },
      },
    })

    return NextResponse.json({ user: newProfile }, { status: 201, headers })
  } catch (error) {
    console.error('clerk-sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

