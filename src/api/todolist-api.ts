import axios from "axios";


type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type CreateTodosType = {
    data:{
        item:TodolistType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
type UpdateAndDeleteTodosType={
data: {}
fieldsErrors: Array<string>
messages: Array<string>
resultCode: number
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
        return instance.get<Array<TodolistType>>("todo-lists")

    },
    createTodos(title: string) {
        return instance.post<{title:string},CreateTodosType>("todo-lists", {title})

    },
    deleteTodos(todolistID: string) {

        return instance.delete<UpdateAndDeleteTodosType>(`/todo-lists/${todolistID}`)

    },
    updateTodos(todolistID: string, title: string) {

        return instance.put<{title:string},UpdateAndDeleteTodosType>(`todo-lists/${todolistID}`, {title})

    }


}