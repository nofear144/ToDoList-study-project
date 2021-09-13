import React, {ChangeEvent,useState} from "react";
import {Input} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    ChangeTitle:(title:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const OnChangeMode = () => {
        setEditMode(true)
    }
    const OffChangeMode = () => {
        setEditMode(false)
        props.ChangeTitle(title)
    }
    return (
        editMode

            ?
            <Input
                value={title}
                inputProps={{ 'aria-label': 'description' }}
                onChange={changeTitle}
                onBlur={OffChangeMode}
                autoFocus
            />
            : <span onDoubleClick={OnChangeMode}
            >{props.title}</span>
    )
}