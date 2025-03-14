import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
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

export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/update`, data, {
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

export const updatePhotoProfile = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/image`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
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

