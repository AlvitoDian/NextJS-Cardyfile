import axios from "axios";
import { CardPayload } from "@/types/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/cards`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const fetchCardById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/cards/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const addCard = async (payload: { card_link: string }) => {
  try {
    const response = await axios.post(`${API_URL}/cards`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const updateCard = async (payload: CardPayload, card_link: string) => {
  try {
    const response = await axios.put(`${API_URL}/cards/${card_link}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};
