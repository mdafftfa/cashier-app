import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import CategoryService from "@services/CategoryService";
import CategoryValidator from "@validators/CategoryValidator";

const categoryPlugin: Hapi.Plugin<undefined> = {
    name: "category",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new CategoryService();
        const validator = new CategoryValidator();
        const controller = new Controller(service, validator);
        server.route(routes(controller));
    },
};

export default categoryPlugin;