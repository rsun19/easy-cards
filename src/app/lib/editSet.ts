export async function editSet(
  accessToken: string,
  setMap: string,
): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set/edit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: setMap,
  });
  return response;
}