import { Server } from '@hapi/hapi';
import * as process from "process";

export function useCors(server: Server) {
    server.settings.routes.cors = {
        origin: [process.env.CLIENT_HOST],
        credentials: true,
        additionalHeaders: ['X-CSRF-Token']
    };
}