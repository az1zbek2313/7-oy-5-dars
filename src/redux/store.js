import { combineReducers, createStore } from "redux";
import {usersReducers} from './usersReducers.js'
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    users: usersReducers
})

export const store = createStore(rootReducer, composeWithDevTools())