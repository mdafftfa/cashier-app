import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import ProductService from "@services/ProductService";

export const productPlugin = {
    name: 'product',
    version: '1.0.0',
    register: async (server: Hapi.Server, options: { validator: any }) => {
        const service = new ProductService();
        const controllerInstance = new Controller(service, options.validator);
        server.route(routes(controllerInstance));
    },
};

export default productPlugin;