import * as Hapi from "@hapi/hapi";
import Handlers from "./handlers";
import { routes } from "./routes";
import OrderService from "@services/OrderService";
import OrderValidator from "@validators/OrderValidator";

const orderPlugin: Hapi.Plugin<undefined> = {
    name: "order",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new OrderService();
        const validator = new OrderValidator();
        const handlers = new Handlers(service, validator);
        server.route(routes(handlers));
    },
};

export default orderPlugin;