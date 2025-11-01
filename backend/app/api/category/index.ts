import * as Hapi from "@hapi/hapi";
import Controller from "./controller";
import { routes } from "./routes";

export const categoryPlugin = {
    name: 'category',
    version: '1.0.0',
    register: async (server: Hapi.Server, { service, validator }: { service: any, validator: any }) => {
        const controllerInstance = new Controller(service, validator);
        server.route(routes(controllerInstance));
    },
};

export default categoryPlugin;