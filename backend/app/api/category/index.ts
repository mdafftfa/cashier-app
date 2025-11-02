import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import CategoryService from "@services/CategoryService";

export const categoryPlugin = {
    name: 'category',
    version: '1.0.0',
    register: async (server: Hapi.Server, options: { validator: any }) => {
        const service = new CategoryService();
        const controllerInstance = new Controller(service, options.validator);
        server.route(routes(controllerInstance));
    },
};

export default categoryPlugin;