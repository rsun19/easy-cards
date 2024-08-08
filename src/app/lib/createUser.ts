export async function createUser(email: string): Promise<Response> {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
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
