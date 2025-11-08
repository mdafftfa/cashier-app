'use strict';

import 'dotenv/config';
import Hapi from '@hapi/hapi';

import Joi from 'joi';

import cartPlugin from './api/cart';
import categoryPlugin from './api/category';
import productPlugin from './api/product';
import orderPlugin from '@api/order';
import * as process from "process";

import {useApiKey} from "./security/ApiKey";
import {useCors} from "./security/Cors";
import {useCsrf} from "./security/Csrf";
import {useRateLimiter} from "./security/RateLimiter";
import {useScooter} from "./security/Scooter";

const init = async () => {

    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
        routes: { cors: { origin: [process.env.CLIENT_HOST] } },
    });

    useApiKey(server);
    useCors(server);
    useCsrf(server);
    useRateLimiter(server);
    useScooter(server);

    server.validator(Joi);

    const plugins = [
        { plugin: cartPlugin, prefix: '/cart' },
        { plugin: categoryPlugin, prefix: '/category' },
        { plugin: productPlugin, prefix: '/product' },
        { plugin: orderPlugin, prefix: '/order' },
    ];

    for (const { plugin, prefix } of plugins) {
        await server.register({ plugin, routes: { prefix } });
    }

    await server.start();

    const routes = server.table().map((r) => ({
        Method: r.method.toUpperCase(),
        Path: r.path,
    }));

    console.log('\n📋 Registered Routes:');
    console.table(routes);
    console.log(`✅ Server is running on ${server.info.uri}`);
};

init().catch((err) => {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
});