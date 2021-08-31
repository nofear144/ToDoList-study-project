import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    ChangeTitleTask:(taskID: string, title: string, todoListID: string)=>void
    ChangeTodoListTitle:(title:string,id:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const getTaskJSXElement = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        const ChangeTitleTask = (title:string) => props.ChangeTitleTask(t.id,title,props.id)


        return (
            <div key={t.id}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title}
                              ChangeTitle={ChangeTitleTask}
                />


                <IconButton onClick={removeTask} aria-label="delete">
                    <Delete />
                </IconButton>
            </div>
        )
    }
    const tasksJSXElements = props.tasks.map(getTaskJSXElement)

    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
    const removeToDoList = () => props.removeTodoList(props.id)
    const addTask=(title:string)=>props.addTask(title,props.id)
    const ChangeTodoListTitle=(title:string)=>{
        props.ChangeTodoListTitle(title,props.id)
    }

    // JSX
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} ChangeTitle={ChangeTodoListTitle}
                />
                <IconButton onClick={removeToDoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>

                <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button variant={ props.filter === "all" ? "contained" : "text"} onClick={setAllFilterValue}> All </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} onClick={setActiveFilterValue}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;