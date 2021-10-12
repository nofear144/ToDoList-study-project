import axios from "axios";


type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<D> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number

}
export type TaskUpdateType={
    title:string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "7aac2eb4-2918-4733-8ea5-37d8d9e18504"
    },


})
export const todolistApi = {
    getTodos() {
        return instance.get<Array<ResponseType<{ item: TodolistType }>>>("todo-lists")

    },
    createTodos(title: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TodolistType }>>("todo-lists", {title})

    },
    deleteTodos(todolistID: string) {

        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistID}`)

    },
    updateTodos(todolistID: string, title: string) {

        return instance.put<{ title: string }, ResponseType<{}>>(`todo-lists/${todolistID}`, {title})

    },

    getTask(todoListId: string) {
        return instance.get(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId:string,taskId:string,model:TaskUpdateType){
        return instance.put(`/todo-lists/${todoListId}/tasks/${taskId}`,model)
    },

}