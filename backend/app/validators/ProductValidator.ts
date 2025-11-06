import Joi from "joi";

export default class ProductValidator {

    validateGetAllProductDataByCategoryId(payload: any) {
        const schema = Joi.object({
            categoryId: Joi.number().integer().positive().required(),
        });

        const { error, value } = schema.validate(payload);

        if (error) throw new Error(`Validation error: ${error.message}`);
        return value;
    }

}