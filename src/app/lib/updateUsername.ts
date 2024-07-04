export async function updateUsername(
  accessToken: string,
  { username }: { username: string },
): Promise<number> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/username/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ username }),
  });
  return response.status;
}