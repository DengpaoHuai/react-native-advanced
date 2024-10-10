import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";

export const SET_ALL_FLOWERS = "SET_ALL_FLOWERS";
export const ADD_FLOWER = "ADD_FLOWER";

export const setAllFlowers = () => {
  return async (dispatch: any) => {
    const response = await apiClient.get("/flowers");
    dispatch({
      type: SET_ALL_FLOWERS,
      payload: response.data,
    });
  };
};

export const addFlower = (flower: Flower) => ({
  type: ADD_FLOWER,
  payload: flower,
});
