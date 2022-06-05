import axios from "axios";

const BACKEND_URL = "https://catfact.ninja";

export async function fetchFacts() {
  const response = await axios.get(BACKEND_URL + "/fact");
  const facts = [];
  for (const key in response.data) {
    const factObj = {
      id: key,
      fact: response.data[key],
      length: response.data[key],
    };
    facts.push(response.data);
  }
  return facts;
}
