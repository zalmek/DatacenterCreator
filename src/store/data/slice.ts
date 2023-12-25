import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

interface IAuth {
    email: string,
    password: string
    is_staff: boolean,
}

export interface IStoreState {
    auth: IAuth | null,
    currentRequestId: number | null
}

const initialState: IStoreState = {
    auth: null,
    currentRequestId: null
}

const dataSlice = createSlice({
    name: "storage",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setAuth: (state, action: PayloadAction<IAuth | null>) => {
            state.auth = action.payload;
        },
        setCurrentRequestId: (state, action: PayloadAction<number | null>) => {
            state.currentRequestId = action.payload;
        },
        reset: (state) => {
            state.auth = initialState.auth;
            state.currentRequestId = initialState.currentRequestId;
        }
    }
})

export const useAuth = () =>
    useSelector((state: RootState) => {
        return state.store.auth;
    });

export const useCurrentRequestId = () =>
    useSelector((state: RootState) => state.store.currentRequestId);



export const {  setAuth, setCurrentRequestId, reset } = dataSlice.actions;
export default dataSlice.reducer;