export async function insertSet(
  accessToken: string,
  setMap: string,
): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: setMap,
  });
  return response;
}
