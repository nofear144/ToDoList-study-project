import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "wat to learn", filter: "all"},
        {id: todoListID2, title: "wat to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState(
        {
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Fish", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
            ]
        })

    //BLL:


    const removeTask = (taskID: string, todoListID: string) => { //2
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }


    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todolists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: "all"
        }
        setTodoLists([...todolists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const ChangeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todolists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }
    const ChangeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks})
    }
// GUI (CRUD):
    const todoListComponents = todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
        }
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
