import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";
export const getBalance = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");

      window.location.href = "/login";
    }
    throw error;
  }
};
