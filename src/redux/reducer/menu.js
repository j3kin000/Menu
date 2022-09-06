import {
  FETCH_ALL_ITEMS,
  FETCH_ITEMS,
  FETCH_ITEMS_CATEGORY,
  UPDATE_ITEMS,
  DELETE_ITEMS,
  ADD_ITEMS,
} from "../constant";

const initialState = {
  menu: [],
  categories: [],
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return { ...state, menu: action.payload };
    case FETCH_ITEMS:
      return { ...state, menu: action.payload };
    case ADD_ITEMS:
      return { ...state, menu: action.payload };
    case FETCH_ITEMS_CATEGORY:
      return { ...state, categories: action.payload };
    case UPDATE_ITEMS:
      return { ...state, menu: action.payload };
    case DELETE_ITEMS:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
};
