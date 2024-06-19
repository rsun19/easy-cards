export async function getAccessToken (refreshToken: string): Promise<Response> {
  try {
    const response = await fetch('http://localhost:9000/auth/token/refresh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`
      }
    })
    return response
  } catch (e) {
    throw new Error('Unable to get access token.')
  }
}
