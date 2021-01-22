import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";



export const rootReducer = combineReducers( { 
    ui: uiReducer,
    // TODO auth: authReducer,
    // TODO calendar: calendarReducer,
 } );