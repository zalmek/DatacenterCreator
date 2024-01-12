import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

interface IAuth {
    email: string,
    is_staff: boolean,
}

export interface IStoreState {
    auth: IAuth | null,
    currentRequestId: number | null
    componentNameForSearch: string | null
}

const initialState: IStoreState = {
    auth: null,
    currentRequestId: null,
    componentNameForSearch: null
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
        setComponentNameForSearch: (state, action: PayloadAction<string | null>) => {
            state.componentNameForSearch = action.payload;
        },
        reset: (state) => {
            state.auth = initialState.auth;
            state.currentRequestId = initialState.currentRequestId;
            state.componentNameForSearch = initialState.componentNameForSearch
        }

    }
})

export const useAuth = () =>
    useSelector((state: RootState) => {
        return state.store.auth;
    });

export const useCurrentRequestId = () =>
    useSelector((state: RootState) => state.store.currentRequestId);

export const useComponentNameForSearch = () =>
    useSelector((state: RootState) => state.store.componentNameForSearch)


export const {  setAuth, setCurrentRequestId,setComponentNameForSearch, reset } = dataSlice.actions;
export default dataSlice.reducer;