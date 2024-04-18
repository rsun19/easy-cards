export interface SessionProps {
  user?: {
    name?: string | null
    email?: string
    image?: string | null
  }
}

export async function getRefreshToken (email: string): Promise<Response> {
  const response = await fetch('http://localhost:9000/auth/token/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  })
  return response
}
