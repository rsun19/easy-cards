import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "../../../../auth";
import { createUser } from "@/app/lib/createUser";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (session?.user?.email != null) {
    try {
      const response = await createUser(session?.user?.email);
      if (response.ok) {
        const textResponse = await response.text();
        cookies().set({
          name: "session",
          value: textResponse,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7 * 4, // One month
          path: "/",
        });
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_REDIRECT_BASE}`, request.url));
      } else {
        return NextResponse.redirect(
          new URL("/token/request/failure", request.url),
        );
      }
    } catch (e) {
      console.log(e);
      return NextResponse.redirect(
        new URL("/token/request/failure", request.url),
      );
    }
  }
  return NextResponse.redirect(new URL("/login/failure", request.url));
}
