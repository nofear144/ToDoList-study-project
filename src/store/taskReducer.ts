import {TasksTypes} from "../App";
import {v1} from "uuid";
import {addTodoListAcType, removeTodoListAcType} from "./todoListReducer";


export const TaskReducer = (state: TasksTypes, action: containerTaskTypes):TasksTypes => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state,[action.todoListID]:[...state[action.todoListID].filter(t=>t.id!==action.taskID)]}
        }
        case "ADD-TASK":{
            return {...state, [action.todoListID]:[...state[action.todoListID],{id:v1(),title:action.title,isDone:false}]}
        }
        case "ADD-TDL":{
            return {...state,[action.universalId]:[]}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state,[action.todolistID]:[...state[action.todolistID].map(t=>t.id===action.taskID?{...t,isDone:action.isDone}:t)]}
        }
        case "CHANGE-TASK-TITLE":{
            return {...state,[action.todoListID]:[...state[action.todoListID].map(t=>t.id===action.taskID?{...t,title:action.title}:t)]}
        }
        case "REMOVE-TDL":{
            let copyState={...state}
            delete copyState[action.todolistID]
            return copyState
        }

        default: return state

    }
}


export  type containerTaskTypes = removeTaskAcType|addTaskAcType|addTodoListAcType|changeTaskStatusAcType|changeTaskTitleAcType|removeTodoListAcType

export type removeTaskAcType = ReturnType<typeof removeTaskAc>
export const removeTaskAc = (taskID: string, todoListID: string) => {
    return {
        type: "REMOVE-TASK",
        taskID:taskID,
        todoListID
    }as const
}


export type addTaskAcType=ReturnType<typeof addTaskAc>
export const addTaskAc=(title:string,todoListID:string)=>{
    return{
        type:"ADD-TASK",
        title,
        todoListID
    } as const
}
export type changeTaskStatusAcType=ReturnType<typeof changeTaskStatusAc>
export const changeTaskStatusAc=(taskID:string,isDone:boolean,todolistID:string)=>{
    return{
        type:"CHANGE-TASK-STATUS",
        taskID,
        isDone,
        todolistID
    }as const
}

export type changeTaskTitleAcType=ReturnType<typeof changeTaskTitleAc>
export const changeTaskTitleAc=(taskID: string, title: string, todoListID: string)=>{
    return{
      type:"CHANGE-TASK-TITLE",
      taskID,
      title,
      todoListID
    }as const
}



