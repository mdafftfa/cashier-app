import { ServerRoute } from "@hapi/hapi";
import Controller from "./handlers";

export const routes = (handlers: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllCartData',
        handler: handlers.getAllCartData.bind(handlers),
    },
    {
        method: 'POST' as const,
        path: '/addProductToCart',
        handler: handlers.addProductToCart.bind(handlers),
        options: {
            cors: true,
        }
    },
    {
        method: 'PUT' as const,
        path: '/updateCartData',
        handler: handlers.updateCartData.bind(handlers),
        options: {
            cors: true
        }
    },
    {
        method: 'DELETE' as const,
        path: '/deleteCartData',
        handler: handlers.deleteCartData.bind(handlers),
    },
];