import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";
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

export const deleteFlowerById = createAsyncThunk(
  "flowers/deleteFlowerById",
  async (id: string) => {
    await apiClient.delete(`/flowers/${id}`);
    return id;
  }
);

export const addFlower = createAsyncThunk(
  "flowers/addFlower",
  async (flower: Omit<Flower, "_id">) => {
    const response = await apiClient.post("/flowers", flower);
    return response.data;
  }
);
