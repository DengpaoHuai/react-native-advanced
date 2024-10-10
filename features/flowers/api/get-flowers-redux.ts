import { apiClient } from "@/lib/api-client";
import { setAllFlowers } from "@/store/asyncThunk/flowers.thunk";
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useFlowersRedux = () => {
  const dispatch = useAppDispatch();
  const { flowers, isLoading, error } = useSelector(
    (state: RootState) => state.flowers
  );

  useEffect(() => {
    apiClient.get("/flowers").then((response) => {
      dispatch(setAllFlowers());
    });
  }, []);

  return {
    flowers,
    isLoading,
    error,
  };
};
