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

export const getHistory = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      params: params
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

export const topUp = async ({ amount }) => {
  try {
    const response = await axios.post(`${BASE_URL}/topup`,
      {
        top_up_amount: amount
      },
      {
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

export const payment = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/transaction`, body,
      {
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

