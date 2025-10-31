import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";

export const cartPlugin = {
    name: 'cart',
    version: '1.0.0',
    register: async (server: Hapi.Server, options: { service: any, validator: any }) => {
        const controllerInstance = new Controller(options.service, options.validator);
        server.route(routes(controllerInstance));
    },
};
