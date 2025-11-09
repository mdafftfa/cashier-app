import * as Hapi from "@hapi/hapi";
import Handlers from "./handlers";
import { routes } from "./routes";
import ProductService from "@services/ProductService";
import ProductValidator from "@validators/ProductValidator";

const productPlugin: Hapi.Plugin<undefined> = {
    name: "product",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new ProductService();
        const validator = new ProductValidator();
        const handlers = new Handlers(service, validator);
        server.route(routes(handlers));
    },
};

export default productPlugin;