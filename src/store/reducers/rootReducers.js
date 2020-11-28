import authReducers from "./authReducers"
import usersReducers from "./usersReducers"
import {combineReducers} from "redux"
import categoriesReducers from "./categoriesReducers";

const rootReducer = combineReducers({
    auth: authReducers,
    users: usersReducers,
    categories: categoriesReducers
})

export default rootReducer
