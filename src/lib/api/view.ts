import { ViewPayload } from "@/types/view";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const postView = async (payload: ViewPayload) => {
  try {
    const response = await axios.post(`${API_URL}/view`, payload);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
