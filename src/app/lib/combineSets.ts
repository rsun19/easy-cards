export async function combineSets(
    accessToken: string,
    starting: number,
    setList: string[],
    setName: string
  ): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set/combine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        starting,
        setList,
        setName
      }),
    });
    return response;
  }
  