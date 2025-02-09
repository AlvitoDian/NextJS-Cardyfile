import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const addCard = async (cardData: { card_link: string }) => {
  try {
    const response = await axios.post(`${API_URL}/cards`, cardData);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};
