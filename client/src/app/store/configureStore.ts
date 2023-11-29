import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../../features/favorite/counterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cartSlice } from '../../features/cart/cartSlice';
import { catalogSlice } from '../../features/content/catalogSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        catalog: catalogSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;