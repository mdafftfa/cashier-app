'use strict';

import {cartPlugin} from "./api/cart";
import {categoryPlugin} from "./api/category";
import productPlugin from "./api/product";

const Hapi = require('@hapi/hapi');

const cartService = require("./services/CartService");
const cartValidator = require("./validators/CartValidator");

const categoryService = require("./services/CategoryService");
const categoryValidator = require("./validators/CategoryValidator");

const productService = require("./services/ProductService");
const productValidator = require("./validators/ProductValidator");

const init = async () => {

    const CartService = new cartService();
    const CategoryService = new categoryService();
    const ProductService = new productService();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: cartPlugin,
            options: { service: CartService, validator: cartValidator },
            routes: { prefix: '/cart' }
        },
        {
            plugin: categoryPlugin,
            options: { service: CategoryService, validator: categoryValidator },
            routes: { prefix: '/category' }
        },
        {
            plugin: productPlugin,
            options: { service: ProductService, validator: productValidator },
            routes: { prefix: '/product' }
        },
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();