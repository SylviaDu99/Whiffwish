import { createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import App from "../layout/App";
import ProductDetails from "../../features/catalog/ProductDetails";
import CartPage from "../../features/cart/CartPage";
import FavoritePage from "../../features/favorite/FavoritePage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import CheckOutPage from "../../features/checkout/CheckOutPage";
import Login from "../../features/login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Catalog />},
            {path: 'catalog', element: <Catalog />},
            {path: 'product/:id', element: <ProductDetails />},
            {path: 'cart', element: <CartPage />},
            {path: 'favorite', element: <FavoritePage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'checkout', element: <CheckOutPage />},
            {path: 'login', element: <Login />},
            {path: '*', element: <NotFound />}
        ]
    }
])