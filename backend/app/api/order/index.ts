import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";
import OrderService from "@services/OrderService";
import OrderValidator from "@validators/OrderValidator";

export const orderPlugin = {
    name: 'order',
    version: '1.0.0',
    register: async (server: Hapi.Server, options: { validator: OrderValidator }) => {
        const service = new OrderService();
        const controllerInstance = new Controller(service, options.validator);
        server.route(routes(controllerInstance));
    },
};

export default orderPlugin;