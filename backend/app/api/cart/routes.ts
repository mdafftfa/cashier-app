import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/cart',
        handler: controllerInstance.getAllCartData.bind(controllerInstance),
    },
];
