import { Dispatch } from 'redux';
import {ResponseType} from '../api/todolists-api';
import {AppStatusAcType, setAppErrorAC, setAppErrorAcType, setAppStatusAC } from '../app/app-reducer';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occured"))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}


type ErrorUtilsDispatchType = Dispatch<setAppErrorAcType|AppStatusAcType>