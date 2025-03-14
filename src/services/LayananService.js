import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";
export const layanan = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");

      window.location.href = "/login";
    }
    throw error;
  }
};

export const promo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.log("🚀 ~ promo ~ error:", error)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");

      window.location.href = "/login";
    }
    throw error;
  }
};