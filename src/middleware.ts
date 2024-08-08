import { type NextRequest, NextResponse } from "next/server";
import { type RefreshTokenResponse } from "./types";
import { getAccessTokenFromBackend } from "./app/lib/getAccessTokenFromBackend";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (
    request.cookies.has("session") &&
    !request.nextUrl.pathname.startsWith("/api/signout")
  ) {
    const cookie = request.cookies.get("session");
    if (cookie !== null && cookie !== undefined) {
      const sessionMap: RefreshTokenResponse = JSON.parse(cookie.value);
      if (sessionMap.refreshTokenExpires <= Math.floor(Date.now() / 1000)) {
        return NextResponse.redirect(new URL("/api/signout", request.url));
      } else if (
        sessionMap.accessTokenExpires <= Math.floor(Date.now() / 1000) &&
        (request.nextUrl.pathname.startsWith("/create") ||
          request.nextUrl.pathname.startsWith("/flashcard") ||
          request.nextUrl.pathname.startsWith("/account") ||
          request.nextUrl.pathname.startsWith("/sets")
        )
      ) {
        /*
        "hacky solution", using redirect...
        https://github.com/vercel/next.js/issues/49442
        */
        const responseUrl = NextResponse.redirect(request.url);
        try {
          const response: Response = await getAccessTokenFromBackend(
            sessionMap.refreshToken,
          );
          const responseText = await response.text();
          const responseTextJson = JSON.parse(responseText);
          sessionMap.accessToken = responseTextJson.accessToken;
          sessionMap.accessTokenExpires = responseTextJson.accessTokenExpires;
          responseUrl.cookies.set("session", JSON.stringify(sessionMap), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 * 4, // One month
            path: "/",
          });
          return responseUrl;
        } catch (e) {
          return NextResponse.redirect(new URL("/api/signout", request.url));
        }
      }
    }
  } else if (
    request.nextUrl.pathname.startsWith("/create") ||
    request.nextUrl.pathname.startsWith("/flashcard") ||
    request.nextUrl.pathname.startsWith("/account") ||
    request.nextUrl.pathname.startsWith("/sets")
  ) {
    return NextResponse.redirect(new URL("/api/login", request.url));
  }
  return NextResponse.next();
}
