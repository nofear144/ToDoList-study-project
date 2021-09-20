import {combineReducers, createStore} from "redux";
import {TodoListReducer} from "./todoListReducer";
import {TaskReducer} from "./taskReducer";

let rootReducer = combineReducers({
    todolists: TodoListReducer,
    tasks: TaskReducer,
})

export type rootStateType=ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)