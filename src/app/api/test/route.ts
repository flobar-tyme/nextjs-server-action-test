import { NextRequest, NextResponse } from "next/server";

import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName } = body;

    if (!firstName) {
      return NextResponse.json(
        { error: "First name is required" },
        { status: 400 }
      );
    }

    // Generate a UUID
    const uuid = randomUUID();

    // Return the UUID
    return NextResponse.json({ uuid });
  } catch (error) {
    console.error("Error in test API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
