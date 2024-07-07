import { type NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "../../../lib/getRefreshToken";
import { cookies } from "next/headers";
import { auth } from "../../../../auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  console.log(session);
  if (session?.user?.email != null) {
    try {
      const response = await getRefreshToken(session?.user?.email);
      console.log(response)
      if (response.ok) {
        const textResponse = await response.text();
        cookies().set({
          name: "session",
          value: textResponse,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7 * 4, // One month
          path: "/",
        });
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        console.log(response)
        // return NextResponse.redirect(
        //   new URL("/token/request/failure", request.url),
        // );
      }
    } catch (e) {
      console.log(e)
      // return NextResponse.redirect(
      //   new URL("/token/request/failure", request.url),
      // );
    }
  }
  // return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.redirect(new URL("/login/failure", request.url));
}
