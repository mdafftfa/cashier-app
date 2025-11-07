import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import OrderService from "@services/OrderService";
import OrderValidator from "@validators/OrderValidator";

export default class Controller {

    private _service: OrderService;
    private _validator: OrderValidator;

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async addOrderData(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const order = await this._service.addOrderData();
            if (order === false) {
                return h.response({
                    status: "Failed",
                    message: "There is no order in cart please make new one!",
                }).code(500);
            }
            return h.response({
                status: "Success",
                data: order,
            }).code(200);
        } catch (error: any) {
            return h.response({ message: `Error: ${error.message}` }).code(500);
        }
    }

}