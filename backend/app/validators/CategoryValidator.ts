import Joi from "joi";

export default class CategoryValidator {

    validateGetCategoryById(payload: any) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        const { error, value } = schema.validate(payload);

        if (error) throw new Error(`Validation error: ${error.message}`);
        return value;
    }

}
