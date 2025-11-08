import { Server } from '@hapi/hapi';
import HapiRateLimit from 'hapi-rate-limit';

export async function useRateLimiter(server: Server) {
    await server.register({
        plugin: HapiRateLimit,
        options: {
            userLimit: 100,   // Max 100 request per ip in minutes
            userCache: {
                expiresIn: 60000
            }
        }
    });
}