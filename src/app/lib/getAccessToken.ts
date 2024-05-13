export async function getAccessToken (refreshToken: string): Promise<Response> {
  const response = await fetch('http://localhost:9000/auth/token/refresh', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`
    }
  })
  return response
}
