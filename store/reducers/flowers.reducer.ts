import { Flower } from "@/types/flowers";

type State = {
  flowers: Flower[];
};

const initialState = {
  flowers: [],
};

const flowersReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_FLOWERS":
      return {
        ...state,
        flowers: action.payload,
      };
    case "ADD_FLOWER":
      return {
        ...state,
        flowers: [...state.flowers, action.payload],
      };
    default:
      return state;
  }
};

export default flowersReducer;
