import { apiClient } from "@/lib/api-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const setAllFlowers = createAsyncThunk(
  "flowers/setAllFlowers",
  async () => {
    await wait(1200);
    const response = await apiClient.get("/flowers");
    return response.data;
  }
);
