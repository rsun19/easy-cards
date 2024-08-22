export async function getSetViewList(accessToken: string, setId: string): Promise<Response> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/set/view/users/${setId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (e) {
      throw new Error("Unable to get access token.");
    }
  }
  