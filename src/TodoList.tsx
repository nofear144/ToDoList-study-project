import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title}
                              ChangeTitle={ChangeTitleTask}
                />

                <button onClick={removeTask}>X</button>
            </li>
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


    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    // JSX
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} ChangeTitle={ChangeTodoListTitle}
                />
                <button onClick={removeToDoList}>x</button>
            </h3>

                <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilterValue}
                >All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilterValue}
                >Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilterValue}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;