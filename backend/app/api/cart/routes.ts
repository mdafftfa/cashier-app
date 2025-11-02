import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllCartData',
        handler: controllerInstance.getAllCartData.bind(controllerInstance),
    },
];
