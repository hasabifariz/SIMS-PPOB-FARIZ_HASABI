import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com/";
export const getProfile = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
};
