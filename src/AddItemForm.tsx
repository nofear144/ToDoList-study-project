import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log("Add item form rendered")

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                label="TypeText"
                variant="outlined"
                error={!!error}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                helperText={error ? "Incorrect entry." : ""}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <PlaylistAdd/>
            </IconButton>

        </div>
    )
})