import {
    authAPI,
    LoginParamsType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}
type initialStateType = typeof initialState

export const loginReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

// actions
export const loginAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(loginAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types

type ActionsType = ReturnType<typeof loginAC> | SetAppStatusActionType | SetAppErrorActionType

/*type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>*/
