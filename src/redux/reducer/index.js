import { combineReducers } from "redux";
import { menuReducer } from "./menu";

export const rootReducer = combineReducers({ menuState: menuReducer });
