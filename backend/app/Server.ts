'use strict';

import 'dotenv/config';
import Hapi from '@hapi/hapi';
import Joi from 'joi';

import cartPlugin from './api/cart';
import categoryPlugin from './api/category';
import productPlugin from './api/product';
import orderPlugin from '@api/order';

import CartService from './services/CartService';
import CartValidator from './validators/CartValidator';

import CategoryService from './services/CategoryService';
import CategoryValidator from './validators/CategoryValidator';

import ProductService from './services/ProductService';
import ProductValidator from './validators/ProductValidator';

import OrderService from '@services/OrderService';
import OrderValidator from '@validators/OrderValidator';

const init = async () => {

    const cartService = new CartService();
    const categoryService = new CategoryService();
    const productService = new ProductService();
    const orderService = new OrderService();

    const cartValidator = new CartValidator();
    const categoryValidator = new CategoryValidator();
    const productValidator = new ProductValidator();
    const orderValidator = new OrderValidator();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: { cors: { origin: ['*'] } },
    });

    server.validator(Joi);

    const plugins = [
        { name: 'Cart', prefix: '/cart', plugin: cartPlugin, service: cartService, validator: cartValidator },
        { name: 'Category', prefix: '/category', plugin: categoryPlugin, service: categoryService, validator: categoryValidator },
        { name: 'Product', prefix: '/product', plugin: productPlugin, service: productService, validator: productValidator },
        { name: 'Order', prefix: '/order', plugin: orderPlugin, service: orderService, validator: orderValidator },
    ];

    for (const { plugin, prefix, service, validator } of plugins) {
        await server.register(
            [
                {
                    plugin,
                    options: { service, validator },
                },
            ],
            { routes: { prefix } }
        );
    }

    await server.start();
    console.log(`✅ Server is running on ${server.info.uri}`);

    const routes = server.table().map((route) => {
        const prefix = `/${route.path.split('/')[1]}`;
        const pluginInfo = plugins.find((p) => p.prefix === prefix);
        return {
            Method: route.method.toUpperCase(),
            Path: route.path,
            Controller: pluginInfo?.service.constructor.name ?? 'Unknown',
            Validator: pluginInfo?.validator.constructor.name ?? 'Unknown',
        };
    });

    console.log('\n📋 Registered Routes:');
    console.table(routes);
};

init().catch((err) => {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
});
