import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket | null) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStoreContext must be used within a StoreProvider');
    }
    return context;
}

export function StoreProvider({children}: PropsWithChildren<unknown>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if(!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(item => item.productId === productId);
        if (itemIndex === -1) return;
        items[itemIndex].quantity -= quantity;
        if (items[itemIndex].quantity <= 0) {
            items.splice(itemIndex, 1);
        }
        setBasket(prevState => {
            if (!prevState) return null;
            return {...prevState, items};
        })
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}