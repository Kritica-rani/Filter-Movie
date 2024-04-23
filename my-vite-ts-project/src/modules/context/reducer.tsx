

import { Action } from "./model"
export interface MovieState{
movie:string
}

export const movieReducer =(state:MovieState,action:Action)=>{
console.log("state",state)
console.log("action",action)
}