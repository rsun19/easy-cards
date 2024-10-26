export async function removeUserFromViewList(
    accessToken: string,
    removedUserEmail: string,
    setId: string
  ): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set/view/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: removedUserEmail,
        setId
      }),
    });
    return response;
  }
  