export async function getRefreshToken(email: string): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  return response;
}
