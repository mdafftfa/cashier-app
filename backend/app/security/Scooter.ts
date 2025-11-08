import { Server } from '@hapi/hapi';
import Scooter from '@hapi/scooter';

export async function useScooter(server: Server) {
    await server.register(Scooter);
}