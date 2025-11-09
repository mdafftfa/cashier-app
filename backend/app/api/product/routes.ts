import { ServerRoute } from "@hapi/hapi";
import Handlers from "./handlers";

export const routes = (handlers: Handlers): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllProductData',
        handler: handlers.getAllProductData.bind(handlers),
    },
    {
        method: 'GET' as const,
        path: '/getAllProductDataByCategoryId',
        handler: handlers.getAllProductDataByCategoryId.bind(handlers),
    },
];