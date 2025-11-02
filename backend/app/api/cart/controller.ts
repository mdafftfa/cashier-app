import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";

export default class controller {

    private _service: any;
    private _validator: any;

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

}