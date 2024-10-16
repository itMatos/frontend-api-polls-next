import { BeuniPollsApiClient } from "./Client";

export async function getPolls() {
  const response = await BeuniPollsApiClient.get("/polls");
  return response.data;
}
