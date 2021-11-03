import React from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, InitialStateType, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { logoutTC } from '../features/Login/login-reducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn= useSelector<AppRootStateType,boolean>(state=>state.auth.isLoggedIn)

    if (!isInitialized) {return  <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>
    }
        return (
            <BrowserRouter>
                <div className="App">
                    <ErrorSnackbar/>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6">
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                            {isLoggedIn && <Button onClick={()=>{dispatch(logoutTC())}} color="inherit">Log out</Button>}
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>

                        <Switch>
                            <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                            <Route exact path={'/login'} render={() => <Login/>}/>
                            <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                            <Redirect from={'*'} to={'/404'}/>
                        </Switch>

                    </Container>
                </div>
            </BrowserRouter>
        )

}

export default App
