import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import OrderService from "@services/OrderService";
import OrderValidator from "@validators/OrderValidator";

const orderPlugin: Hapi.Plugin<undefined> = {
    name: "order",
    version: "1.0.0",
    register: async (server: Hapi.Server) => {
        const service = new OrderService();
        const validator = new OrderValidator();
        const controller = new Controller(service, validator);
        server.route(routes(controller));
    },
};

export default orderPlugin;