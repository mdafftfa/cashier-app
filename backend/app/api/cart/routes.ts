import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllCartData',
        handler: controllerInstance.getAllCartData.bind(controllerInstance),
    },
    {
        method: 'POST' as const,
        path: '/addProductToCart',
        handler: controllerInstance.addProductToCart.bind(controllerInstance),
        options: {
            cors: true,
        }
    },
    {
        method: 'PUT' as const,
        path: '/updateCartData',
        handler: controllerInstance.updateCartData.bind(controllerInstance),
        options: {
            cors: true
        }
    },
    {
        method: 'DELETE' as const,
        path: '/deleteCartData',
        handler: controllerInstance.deleteCartData.bind(controllerInstance),
    },
];
