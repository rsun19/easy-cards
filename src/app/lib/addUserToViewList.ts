export async function addUserToViewList(
    accessToken: string,
    addedUserEmail: string,
    setId: string
  ): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set/view/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: addedUserEmail,
        setId
      }),
    });
    return response;
  }
  