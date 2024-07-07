export async function getRefreshToken(email: string): Promise<Response> {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/request`)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  console.log(response)
  return response;
}
