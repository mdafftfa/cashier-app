import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import CategoryService from "@services/CategoryService";
import CategoryValidator from "@validators/CategoryValidator";

export default class Controller {

    private _service: CategoryService;
    private _validator: CategoryValidator;

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

    async getCategoryById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const payload = this._validator.validateGetCategoryById(request.query);
            const category = await this._service.getCategoryById(payload.categoryId);
            return h.response({
                status: "Success",
                data: category,
            }).code(200);
        } catch (error: any) {
            return h.response({
                status: "error",
                message: error.message
            });
        }
    }
}