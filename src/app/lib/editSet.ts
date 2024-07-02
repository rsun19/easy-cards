export async function editSet(
  accessToken: string,
  setMap: string,
): Promise<Response> {
  const url = "http://localhost:9000";
  const response = await fetch(`${url}/api/set/edit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: setMap,
  });
  return response;
}