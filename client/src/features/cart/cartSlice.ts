import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface CartState {
    basket: Basket | null;
    status: string;
}

const initialState: CartState = {
    basket: null,
    status: 'idle',
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity: number}>(
    'cart/addBasketItemAsync',
    async ({productId, quantity=1}) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
    'cart/removeBasketItemAsync',
    async ({productId, quantity}) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        })
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        })
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        })
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(item => item.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket!.items[itemIndex].quantity === 0) {
                state.basket!.items.splice(itemIndex, 1);
            }
            state.status = 'idle';
        })
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
    }
})

export const { setBasket} = cartSlice.actions;