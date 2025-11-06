import { ServerRoute } from "@hapi/hapi";
import Controller from "./controller";

export const routes = (controllerInstance: Controller): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllProductData',
        handler: controllerInstance.getAllProductData.bind(controllerInstance),
    },
    {
        method: 'GET' as const,
        path: '/getAllProductDataByCategoryId',
        handler: controllerInstance.getAllProductDataByCategoryId.bind(controllerInstance),
    },
];