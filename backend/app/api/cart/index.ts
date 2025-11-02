import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import CartService from "@services/CartService";

export const cartPlugin = {
    name: 'cart',
    version: '1.0.0',
    register: async (server: Hapi.Server, options: { validator: any }) => {
        const service = new CartService();
        const controllerInstance = new Controller(service, options.validator);
        server.route(routes(controllerInstance));
    },
};

export default cartPlugin;