import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";
export const login = async (body) => {
  const response = await axios.post(`${BASE_URL}/login`, body);
  return response.data;
};


// {
//   "status": 108,
//   "message": "Token tidak tidak valid atau kadaluwarsa",
//   "data": null
// }