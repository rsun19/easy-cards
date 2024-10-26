export async function editSet(
  accessToken: string,
  setMap: string,
): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: setMap,
  });
  return response;
}