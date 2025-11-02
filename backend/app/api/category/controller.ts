import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";

export default class Controller {

    private _service: any;
    private _validator: any;

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async getAllCategoryData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const category = await this._service.getAll();
            return h.response({
                status: "success",
                data: category,
            }).code(200);
        } catch (error: any) {
            return h.response({
                status: "error",
                message: error.message || "Failed to fetch cart data",
            }).code(500);
        }
    }
}