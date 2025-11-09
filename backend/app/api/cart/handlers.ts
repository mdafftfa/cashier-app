import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import CartService from "@services/CartService";
import CartValidator from "@validators/CartValidator";

export default class handlers {

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
            const payload = this._validator.validateAddToCart(request.query);

            await this._service.addProductToCart(
                payload.name,
                payload.price,
                payload.amount,
                payload.description
            );

            return h.response({ status: "success" }).code(200);
        } catch (error: any) {
            console.error(error.message);
            return h.response({
                status: "error",
                message: error.message || "Failed to add to cart",
            }).code(400);
        }
    }

    async updateCartData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const payload = this._validator.validateUpdateCart(request.query);

            await this._service.updateCartData(
                Number(payload.id),
                Number(payload.amount),
                payload.description
            );
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
            const payload = this._validator.validateDeleteCart(request.query);

            await this._service.deleteCartData(Number(payload.id));
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