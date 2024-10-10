/*import { applyMiddleware, createStore } from "redux";
import flowersReducer from "./reducers/flowers.reducer";
import { thunk } from "redux-thunk";

export const store = createStore(flowersReducer, applyMiddleware(thunk));
*/
import { useDispatch } from "react-redux";
import flowersReducer from "../store/slices/flowerSlice";
import { configureStore } from "@reduxjs/toolkit";

/*export const useAppSelector = (selector: (state: RootState) => any) => {
  return selector(store.getState());
};*/

export const store = configureStore({
  reducer: {
    flowers: flowersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
