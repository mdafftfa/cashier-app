'use strict';

import 'dotenv/config';
import Hapi from '@hapi/hapi';

import cartPlugin from './api/cart';
import categoryPlugin from './api/category';
import productPlugin from './api/product';

import CartService from './services/CartService';
import CartValidator from './validators/CartValidator';

import CategoryService from './services/CategoryService';
import CategoryValidator from './validators/CategoryValidator';

import ProductService from './services/ProductService';
import ProductValidator from './validators/ProductValidator';

const init = async () => {
    const cartService = new CartService();
    const categoryService = new CategoryService();
    const productService = new ProductService();

    const cartValidator = new CartValidator();
    const categoryValidator = new CategoryValidator();
    const productValidator = new ProductValidator();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: { cors: { origin: ['*'] } },
    });

    await server.register([
        {
            plugin: cartPlugin,
            options: { service: cartService, validator: cartValidator },
            routes: { prefix: '/cart' },
        },
        {
            plugin: categoryPlugin,
            options: { service: categoryService, validator: categoryValidator },
            routes: { prefix: '/category' },
        },
        {
            plugin: productPlugin,
            options: { service: productService, validator: productValidator },
            routes: { prefix: '/product' },
        },
    ]);

    await server.start();
    console.log('✅ Server is running on %s', server.info.uri);
};

init();
