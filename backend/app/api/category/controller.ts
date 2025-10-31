export default class Controller {
    private _service: any;
    private _validator: any;

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async getAllCartData(request, h) {
        return { message: 'Data berhasil diambil' };
    }
}