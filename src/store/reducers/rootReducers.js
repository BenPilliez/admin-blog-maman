import authReducers from "./authReducers"
import usersReducers from "./usersReducers"
import categoriesReducers from "./categoriesReducers"
import handleRequestReducers from "./handleRequestReducers"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth: authReducers,
    users: usersReducers,
    categories: categoriesReducers,
    request: handleRequestReducers
})

export default rootReducer
