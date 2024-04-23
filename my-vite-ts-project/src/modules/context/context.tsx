import {createContext } from "react";
import { MovieState } from "./reducer";
export interface Context{
    state:MovieState;
    dispatch:unknown
}
export const MovieContext = createContext({})