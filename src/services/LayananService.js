import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com/";
export const layanan = async () => {
  const response = await axios.get(`${BASE_URL}/services`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
};

export const promo = async () => {
  const response = await axios.get(`${BASE_URL}/banner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
};