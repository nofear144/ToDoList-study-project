import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

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


    const todoListComponents = todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}


            />
        )
    })
    // GUI (CRUD):
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
