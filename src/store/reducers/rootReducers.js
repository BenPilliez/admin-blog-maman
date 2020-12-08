import authReducers from "./authReducers"
import usersReducers from "./usersReducers"
import categoriesReducers from "./categoriesReducers"
import handleRequestReducers from "./handleRequestReducers"
import postsReducers from "./postsReducers"
import commentsReducers from "./commentsReducers"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth: authReducers,
    users: usersReducers,
    categories: categoriesReducers,
    request: handleRequestReducers,
    posts: postsReducers,
    comments: commentsReducers
})

export default rootReducer
