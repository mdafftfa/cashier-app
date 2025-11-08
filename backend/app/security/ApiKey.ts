import { Server } from '@hapi/hapi';

export function useApiKey(server: Server) {
    server.ext('onRequest', (request, h) => {
        const apiKey = request.headers['x-api-key'];

        if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
            return h.response({ message: 'Unauthorized' }).code(401).takeover();
        }

        return h.continue;
    });
}