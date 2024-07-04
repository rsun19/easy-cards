export const getFlashcardsFromAPI = async (
  accessToken: string,
  id: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sets/flashcards/get/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.status !== 200) {
      return null;
    }
    const responseText = await response.text();
    return responseText;
  } catch (e) {
    return null;
  }
};
