import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const userRegist = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    console.log(payload, "payload");
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};
