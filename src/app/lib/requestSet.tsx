import { type SetType, type AccessTokenResponse } from "@/types";
import { getUserSets } from "./getUserSets";
import { getAccessToken } from "./getAccessToken";

export const requestSet = async (
  accessToken: string,
  refreshToken: string,
): Promise<SetType[]> => {
  let userSetData = await getUserSets(accessToken);
  if (userSetData === null) {
    const response = await getAccessToken(refreshToken);
    if (response.ok) {
      const textResponseJSON: AccessTokenResponse = await response.json();
      userSetData = await getUserSets(textResponseJSON.accessToken);
      if (userSetData === null) {
        console.log("Failed to fetch sets");
        return [];
      }
    } else {
      throw new Error("Cannot request set");
    }
  }
  if (userSetData === null) {
    console.log("Sets failed to load");
  } else {
    const responseData = JSON.parse(userSetData);
    const sets = [];
    for (let i = 0; i < responseData.sets.length; i++) {
      sets.push({
        key: i.toString(),
        id: responseData.sets[i].id,
        author: responseData.username,
        name: responseData.sets[i].name,
      });
    }
    return sets;
  }
  return [];
};
