import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      return NextResponse.json(
        { error: "ImageKit environment variables are missing." },
        { status: 500 }
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      publicKey,
      privateKey,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to authenticate upload." },
      { status: 500 }
    );
  }
}
