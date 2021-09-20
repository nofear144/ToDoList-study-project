import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";





const initialState:TodoListType[]=[];

export const TodoListReducer = (state:TodoListType[]=initialState, action: containerTypes):TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TDL": {
            return state.filter(tl => tl.id !== action.todolistID)
        }
        case "CHANGE-TDL-TITLE": {
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-FILTER": {

            return state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
        }
        case "ADD-TDL": {
            let newTDl:TodoListType={
                id:action.universalId,
                title:action.title,
                filter:"all"
            }
            return [...state, newTDl]
        }
        default:
            return state
    }
}

export type containerTypes = removeTodoListAcType | ChangeTodoListTitleAcType | changeFilterAcType | addTodoListAcType



export type removeTodoListAcType = ReturnType<typeof removeTodoListAc>
export const removeTodoListAc = (todolistID: string) => {
    return {
        type: "REMOVE-TDL",
        todolistID
    } as const
}

export type ChangeTodoListTitleAcType = ReturnType<typeof ChangeTodoListTitleAc>
export const ChangeTodoListTitleAc = (title: string, todolistID: string) => {
    return {
        type: "CHANGE-TDL-TITLE",
        title,
        todolistID,
    } as const
}


export type changeFilterAcType = ReturnType<typeof changeFilterAc>
export const changeFilterAc = (filter: FilterValuesType, todolistID: string) => {
    return {
        type: "CHANGE-FILTER",
        filter,
        todolistID
    } as const
}


export type addTodoListAcType = ReturnType<typeof addTodoListAc>
export const addTodoListAc = (title: string) => {
    return {
        type: "ADD-TDL",
        title,
        universalId: v1()
    } as const
}

