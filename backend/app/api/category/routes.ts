import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllCategoryData',
        handler: controllerInstance.getAllCategoryData.bind(controllerInstance),
    },
];
