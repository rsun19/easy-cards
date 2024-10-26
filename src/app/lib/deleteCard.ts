export async function deleteCard(
    accessToken: string,
    id: number,
  ): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/card`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id }),
    });
    return response;
  }
  