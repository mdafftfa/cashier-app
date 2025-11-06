import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'POST' as const,
        path: '/addOrderData',
        handler: controllerInstance.addOrderData.bind(controllerInstance),
        options: {
            cors: true
        }
    },
];