import { Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import { ADMIN_ROUTE, ANY_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/constants";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        element: <Basket />
    }
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    },
    {
        path: DEVICE_ROUTE + '/:id',
        element: <DevicePage />
    },
    {
        path: ANY_ROUTE,
        element: <Navigate to='/' />
    }
];

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
];
