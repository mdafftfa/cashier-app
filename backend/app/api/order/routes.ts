import { ServerRoute } from "@hapi/hapi";
import Handlers from "./handlers";

export const routes = (handlers: Handlers): ServerRoute[] => [
    {
        method: 'POST' as const,
        path: '/addOrderData',
        handler: handlers.addOrderData.bind(handlers),
        options: {
            cors: true
        }
    },
];