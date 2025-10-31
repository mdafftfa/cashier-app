import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/category',
        handler: controllerInstance.getAllCartData.bind(controllerInstance),
    },
];
