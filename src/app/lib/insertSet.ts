export async function insertSet (accessToken: string, setMap: string): Promise<Response> {
  console.log(setMap)
  const url = 'http://localhost:9000'
  const response = await fetch(`${url}/api/set/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: setMap
  })
  return response
}
