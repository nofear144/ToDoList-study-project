import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react'
import {TaskUpdateType, todolistApi} from "../api/todolist-api";

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
    const [title, setTitle] = useState<string>("")
    const [state, setState] = useState<any>(null)

    const TodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const CreateTodolist = () => {
        todolistApi.createTodos(title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistTitle"} value={title} onChange={TodolistTitle}/>
            <button onClick={CreateTodolist}>CreateTodo</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")

    const EntireTodolistId = () => {
        todolistApi.deleteTodos(todoId)
            .then(res => setState(res.data))
    }
    const TodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistId"} value={todoId} onChange={TodolistId}/>
            <button onClick={EntireTodolistId}>DeleteTodo</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const UpdateTodolist=()=>{
        todolistApi.updateTodos(todolistId, title)
            .then(res => setState(res.data))
    }
    const ChangeTitleTodo=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const ChangeTodolistId=(e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistTitle"} value={title} onChange={ChangeTitleTodo}/>
            <input placeholder={"TodolistId"} value={todolistId} onChange={ChangeTodolistId}/>
            <button onClick={UpdateTodolist}>UpdateTodo</button>
        </div>
    </div>
}

export const GetTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>("")



    const setTodoID=(e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }

    const GetTask=()=>{
        todolistApi.getTask(todolistId)
            .then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
        <div>

            <input placeholder={"TodolistId"} value={todolistId} onChange={setTodoID}/>
            <button onClick={GetTask}>GetTask</button>
        </div>
    </div>
}

export const CreateTask = () => {


    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const createNewTask = () => {
        todolistApi.createTask(todolistId, title)
            .then(res => setState(res.data))
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TaskTitle"} value={title} onChange={changeTitle}/>
            <input placeholder={"todolistId"} value={todolistId} onChange={changeTodolistId}/>
            <button onClick={createNewTask}>CreatTask</button>
        </div>
    </div>

}

export const DeleteTask = () => {

    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [state, setState] = useState<any>(null)

    const ChangeTaskId=(e:ChangeEvent<HTMLInputElement>)=>{
        setTaskId(e.currentTarget.value)
    }
    const ChangeTodolistId=(e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const DeleteTask=()=>{
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TaskId"} value={taskId} onChange={ChangeTaskId}/>
            <input placeholder={"TodolistId"} value={todolistId} onChange={ChangeTodolistId}/>
            <button onClick={DeleteTask}>DeleteTask</button>
        </div>
    </div>

}

export const UpdateTask = () => {


    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [todolistID, settodolistID] = useState<string>("")
    const [taskId, settaskId] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [completed, setCompleted] = useState<boolean>(true)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(1)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        settaskId(e.currentTarget.value)
    }
    const changeTodoListId = (e: ChangeEvent<HTMLInputElement>) => {
        settodolistID(e.currentTarget.value)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

        setStatus(+e.currentTarget.value)
    }
    const changePriority = (e: ChangeEvent<HTMLInputElement>) => {

        setPriority(+e.currentTarget.value)
    }

    const UpdateTask = () => {
        todolistApi.updateTask(todolistID, taskId, {
            title: title,
            description: description,
            completed: completed,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then(res => setState(res.data))
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistId"} value={todolistID} onChange={changeTodoListId}/>
            <input placeholder={"TaskId"} value={taskId} onChange={changeTaskId}/>
            <input placeholder={"TaskTitle"} value={title} onChange={changeTitle}/>
            <input placeholder={"Description"} value={description} onChange={changeDescription}/>
            <input placeholder={"Status"} type={"number"} value={status} onChange={changeStatus}/>
            <input placeholder={"Priority"} type={"number"} value={priority} onChange={changePriority}/>
            <button onClick={UpdateTask}>UpdateTask</button>
        </div>

    </div>
}

