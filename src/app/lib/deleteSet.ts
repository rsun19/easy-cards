export async function deleteSetAPI(
  accessToken: string,
  id: number,
): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ set: id }),
  });
  return response;
}
