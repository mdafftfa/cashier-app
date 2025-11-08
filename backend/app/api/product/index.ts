import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import ProductService from "@services/ProductService";
import ProductValidator from "@validators/ProductValidator";

const productPlugin: Hapi.Plugin<undefined> = {
    name: "product",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new ProductService();
        const validator = new ProductValidator();
        const controller = new Controller(service, validator);
        server.route(routes(controller));
    },
};

export default productPlugin;