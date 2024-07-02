export const getUsername = async (
  accessToken: string,
): Promise<string | null> => {
  try {
    const response = await fetch("http://localhost:9000/api/username", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status !== 200) {
      return null;
    }
    const responseText = await response.text();
    return JSON.parse(responseText);
  } catch (e) {
    return null;
  }
};
