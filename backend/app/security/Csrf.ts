import {Request, ResponseToolkit, Server} from '@hapi/hapi';
import Crumb from '@hapi/crumb';

export async function useCsrf(server: Server) {

    server.route({
        method: 'GET',
        path: '/csrf',
        handler: (request: Request, h: ResponseToolkit) => {
            const token = (request.plugins as any).crumb;
            return h.response({ token }).code(200);
        }
    });

    await server.register({
        plugin: Crumb,
        options: {
            restful: true,
            cookieOptions: {
                isSecure: false,
                isHttpOnly: true,
                isSameSite: 'None',
                path: '/'
            }
        }
    });
}