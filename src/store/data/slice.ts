import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name: "data",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        data: [],
        totalSum: 0,
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setData(state, {payload}) {
            state.data = payload
        }
    }
})

export const { actions: dataActions, reducer: dataReducer } = dataSlice