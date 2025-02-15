import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

// handles login user
export const handleLogin = async (formData) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: formData.email,
      password: formData.password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// handles register user
export const handleRegister = async (formData) => {
  try {
    // Register API request
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    });
  } catch (error) {
    console.log(error);
  }
};
