export async function updateUsername (accessToken: string, { username }: { username: string }): Promise<number> {
  const url = 'http://localhost:9000'
  const response = await fetch(`${url}/api/username/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ username })
  })
  return response.status
}
