import * as Hapi from "@hapi/hapi";
import Handlers from "./handlers";
import { routes } from "./routes";
import CartService from "@services/CartService";
import CartValidator from "@validators/CartValidator";

const cartPlugin: Hapi.Plugin<undefined> = {
    name: "cart",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new CartService();
        const validator = new CartValidator();
        const handlers = new Handlers(service, validator);

        server.route(routes(handlers));
    },
};

export default cartPlugin;