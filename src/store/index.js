import { combineReducers, createStore } from "redux"
import { postReducer } from './redusers/post'

const rootReduser = combineReducers({
    post: postReducer
})

export default createStore(rootReduser)