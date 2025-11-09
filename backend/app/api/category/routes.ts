import { ServerRoute } from "@hapi/hapi";
import Handlers from "./handlers";

export const routes = (handlers: Handlers): ServerRoute[] => [
    {
        method: 'GET' as const,
        path: '/getAllCategoryData',
        handler: handlers.getAllCategoryData.bind(handlers),
    },
    {
        method: 'GET' as const,
        path: '/getCategoryById',
        handler: handlers.getCategoryById.bind(handlers),
    },
];