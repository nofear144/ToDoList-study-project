import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAc,
    changeFilterAc,
    ChangeTodoListTitleAc,
    removeTodoListAc,
} from "./store/todoListReducer";
import {addTaskAc, changeTaskStatusAc, changeTaskTitleAc, removeTaskAc} from "./store/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed"
export  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksTypes = {
    [key: string]: TaskType[]
}


function App() {
    console.log("app rendered")
    const dispatch = useDispatch();
    const todolists = useSelector<rootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<rootStateType, TasksTypes>(state => state.tasks)


    //BLL:


    const removeTask = useCallback( (taskID: string, todoListID: string) => { //2
        dispatch(removeTaskAc(taskID, todoListID))
    },[dispatch])

    const addTask =useCallback( (title: string, todoListID: string) => {
        dispatch(addTaskAc(title, todoListID))
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAc(taskID, isDone, todoListID))
    },[dispatch])


    const changeFilter = useCallback( (filter: FilterValuesType, todoListID: string) => dispatch(changeFilterAc(filter, todoListID)),[dispatch])

    const removeTodoList =useCallback( (todoListID: string) => dispatch(removeTodoListAc(todoListID)),[dispatch])

    const addTodoList =useCallback( (title: string) => {
        let newAction = addTodoListAc(title)
        dispatch(newAction)


    },[dispatch])

    const ChangeTodoListTitle = useCallback( (title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAc(title, todoListID))
    },[dispatch])

    const ChangeTaskTitle =useCallback( (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAc(taskID, title, todoListID))
    },[dispatch])
// GUI (CRUD):
    const todoListComponents = todolists.map(tl => {
       let allTasks = tasks[tl.id]
        let tasksForTodoList=allTasks
        /*  if (tl.filter === "active") {
             tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
         }
         if (tl.filter === "completed") {
             tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
         }*/
        return (
            <Grid item key={tl.id}>
                <Paper elevation={10} style={{padding: "20px"}}>
                    <TodoList

                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        ChangeTitleTask={ChangeTaskTitle}
                        ChangeTodoListTitle={ChangeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container
                fixed

            >
                <Grid container style={{padding: "10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid
                    container
                    spacing={5}
                    style={{justifyContent: 'center'}}
                >
                    {todoListComponents}
                </Grid>


            </Container>
        </div>
    );
}

export default App;
