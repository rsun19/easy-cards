export async function modifyStarredQuestion(
    accessToken: string,
    question: string,
  ): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_TO_API_URL}/api/modifyStarredQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: question,
    });
    return response;
  }
  