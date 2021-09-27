import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../TodoList";

type TaskPropsType = {
    task: TaskType
    id: string
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    ChangeTitleTask: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback( () => props.removeTask(props.task.id, props.id),[props.removeTask,props.task.id, props.id])
    const changeTaskStatus =useCallback( (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.id),[props.changeTaskStatus,props.task.id,props.id])

    const ChangeTitleTask = (title: string) => props.ChangeTitleTask(props.task.id, title, props.id)


    return (
        <div key={props.task.id}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title}
                          ChangeTitle={ChangeTitleTask}
            />


            <IconButton onClick={removeTask} aria-label="delete">
                <Delete/>
            </IconButton>
        </div>
    )
})