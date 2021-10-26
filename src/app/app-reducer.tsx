//Reducer
const initialState = {
    status: "loading" as RequestsType,
    error:null as ErrorType ,
}

export const appReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state,error:action.error}
        default:
            return state
    }
}


//Types

export type RequestsType = "idle" | "loading" | "succeeced" | "failed"
export type ErrorType= null|string
export type initialStateType = typeof initialState
export type ActionTypes = AppStatusAcType | setAppErrorAcType
export type AppStatusAcType = ReturnType<typeof setAppStatusAC>
export type setAppErrorAcType = ReturnType<typeof setAppErrorAC>

//ActionCreators

export const setAppStatusAC = (status: RequestsType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error:ErrorType) => ({type: "APP/SET-ERROR",error} as const)