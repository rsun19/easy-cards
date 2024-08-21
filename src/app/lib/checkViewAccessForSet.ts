export const checkViewAccessForSets = async (
    accessToken: string,
    setId: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set/view/${setId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };
  