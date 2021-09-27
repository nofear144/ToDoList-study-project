import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./store/Task";

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
    ChangeTitleTask: (taskID: string, title: string, todoListID: string) => void
    ChangeTodoListTitle: (title: string, id: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("Todolist rendered")


    const getTaskJSXElement = (t: TaskType) => {
        return <Task
            id={props.id}
            changeTaskStatus={props.changeTaskStatus}
            ChangeTitleTask={props.ChangeTitleTask}
            removeTask={props.removeTask}
            task={t}
            key={t.id}
        />
    }
    const tasksJSXElements = props.tasks.map(getTaskJSXElement)

    const setAllFilterValue = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const setActiveFilterValue = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const setCompletedFilterValue = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const removeToDoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const ChangeTodoListTitle = useCallback((title: string) => {
        props.ChangeTodoListTitle(title, props.id)
    }, [props.ChangeTodoListTitle, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    // JSX
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} ChangeTitle={ChangeTodoListTitle}
                />
                <IconButton onClick={removeToDoList} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={setAllFilterValue}> All </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}
                        onClick={setActiveFilterValue}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"}
                        onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    )
})

export default TodoList;