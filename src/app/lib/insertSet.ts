export async function insertSet (cookie: string, setMap: string): Promise<Response> {
  const cookieData = JSON.parse(cookie)
  const bodyMap = {
    user: cookie,
    setMap
  }
  const response = await fetch(`${process.env.API_URL}/api/send/set`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieData.accessToken}`
    },
    body: JSON.stringify(bodyMap)
  })
  return response
}
