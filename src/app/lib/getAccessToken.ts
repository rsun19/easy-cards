export async function getAccessToken (cookie: string): Promise<Response> {
  const response = await fetch(`${process.env.API_URL}/auth/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cookie
    })
  })
  return response
}
