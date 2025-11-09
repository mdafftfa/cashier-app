import * as Hapi from "@hapi/hapi";
import Handlers from "./handlers";
import { routes } from "./routes";
import CategoryService from "@services/CategoryService";
import CategoryValidator from "@validators/CategoryValidator";

const categoryPlugin: Hapi.Plugin<undefined> = {
    name: "category",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new CategoryService();
        const validator = new CategoryValidator();
        const handlers = new Handlers(service, validator);
        server.route(routes(handlers));
    },
};

export default categoryPlugin;