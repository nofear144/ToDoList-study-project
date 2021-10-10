import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title="NewPostWoW"
        todolistApi.createTodos(title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    let todolistID = "0668624f-789a-4570-aaf9-a735c1bb4471";
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.deleteTodos(todolistID)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    let title =  "changed TDL"
    let todolistID = "2b8c0014-19de-4503-809b-53cc87af1767"
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.updateTodos(todolistID,title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

