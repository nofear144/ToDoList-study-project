import React, {ChangeEvent, KeyboardEvent,  useState} from "react";

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
            ? <input
                value={title}
                onChange={changeTitle}
                onBlur={OffChangeMode}
                autoFocus/>
            : <span onDoubleClick={OnChangeMode}
            >{props.title}</span>
    )
}