import { createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import App from "../layout/App";
import ProductDetails from "../../features/catalog/ProductDetails";
import CartPage from "../../features/cart/CartPage";
import FavoritePage from "../../features/favorite/FavoritePage";
import HomePage from "../../features/home/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'product/:id', element: <ProductDetails />},
            {path: 'cart', element: <CartPage />},
            {path: 'favorite', element: <FavoritePage />},
        ]
    }
])