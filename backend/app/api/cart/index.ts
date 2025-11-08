import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import CartService from "@services/CartService";
import CartValidator from "@validators/CartValidator";

const cartPlugin: Hapi.Plugin<undefined> = {
    name: "cart",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new CartService();
        const validator = new CartValidator();
        const controller = new Controller(service, validator);

        server.route(routes(controller));
    },
};

export default cartPlugin;