import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com/";
export const getBalance = async () => {
  const response = await axios.get(`${BASE_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
};
