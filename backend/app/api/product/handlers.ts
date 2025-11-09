import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import ProductService from "@services/ProductService";
import ProductValidator from "@validators/ProductValidator";

export default class Handlers {

    private _service: ProductService;
    private _validator: ProductValidator;

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async getAllProductData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const product = await this._service.getAll();
            return h.response({
                status: "Success",
                data: product,
            }).code(200);
        } catch (error: any) {
            return h.response({ message: `Error: ${error.message}` }).code(500);
        }
    }
    
    async getAllProductDataByCategoryId(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const payload = this._validator.validateGetAllProductDataByCategoryId(request.query);
            const product = await this._service.getAllByCategoryId(payload.categoryId);
            return h.response({
                status: "Success",
                data: product,
            }).code(200);
        } catch (error: any) {
            return h.response({ message: `Error: ${error.message}` }).code(500);
        }
    }

}