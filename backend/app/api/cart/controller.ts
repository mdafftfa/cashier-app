import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import CartService from "@services/CartService";
import CartValidator from "@validators/CartValidator";

export default class controller {

    private _service: CartService;
    private _validator: CartValidator;

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async getAllCartData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const carts = await this._service.getAll();
            return h.response({
                status: "success",
                data: carts,
            }).code(200);
        } catch (error: any) {
            return h.response({
                status: "error",
                message: error.message || "Failed to fetch cart data",
            }).code(500);
        }
    }

    async addProductToCart(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const { name, price, description } = request.query as {
                name: string;
                price: number;
                amount: number;
                totalPrice: number;
                description: string;
            };

            await this._service.addProductToCart(
                name,
                price,
                1,
                description
            );

            return h.response({
                status: "success",
            });
        } catch (error: any) {
            console.log(error.message);
            return h.response({
                status: "error",
                message: error.message || "Failed to add to cart",
            }).code(500);
        }
    }

    async updateCartData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const { id, amount, description } = request.query as {
                id: number;
                amount: number;
                description: string;
            };

            await this._service.updateCartData(Number(id), Number(amount), description);
            return h.response({
                message: "success"
            }).code(200);
        } catch (error: any) {
            return h.response({
                message: error.message
            }).code(500);
        }
    }

    async deleteCartData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const { id } = request.query as {
                id: number;
            };

            await this._service.deleteCartData(Number(id));
            return h.response({
                message: "success"
            }).code(200);
        } catch (error: any) {
            return h.response({
                message: error.message
            }).code(500);
        }
    }

}