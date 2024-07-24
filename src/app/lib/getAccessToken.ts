export async function getAccessToken(refreshToken: string): Promise<Response> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  } catch (e) {
    throw new Error("Unable to get access token.");
  }
}
