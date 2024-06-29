export async function deleteSetAPI (accessToken: string, id: number): Promise<Response> {
  const url = 'http://localhost:9000'
  const response = await fetch(`${url}/api/set/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ set: id })
  })
  return response
}
