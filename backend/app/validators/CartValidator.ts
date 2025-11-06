import Joi from "joi";

export default class CartValidator {

    validateAddToCart(payload: any) {
        const schema = Joi.object({
            name: Joi.string().min(1).required(),
            price: Joi.number().positive().required(),
            amount: Joi.number().integer().min(1).default(1),
            description: Joi.string().allow("", null),
        });

        const { error, value } = schema.validate(payload);

        if (error) {
            throw new Error(`Validation error: ${error.message}`);
        }

        return value;
    }

    validateUpdateCart(payload: any) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required(),
            amount: Joi.number().integer().min(1).required(),
            description: Joi.string().allow("", null),
        });

        const { error, value } = schema.validate(payload);

        if (error) throw new Error(`Validation error: ${error.message}`);
        return value;
    }

    validateDeleteCart(payload: any) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        const { error, value } = schema.validate(payload);

        if (error) throw new Error(`Validation error: ${error.message}`);
        return value;
    }
}
