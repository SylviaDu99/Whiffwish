import { createSlice } from "@reduxjs/toolkit";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: "Hello World (toolkit)"
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.data += 1;
        },
        decrement: (state) => {
            state.data -= 1;
        },
        incrementByAmount: (state, action) => {
            state.data += action.payload;
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;