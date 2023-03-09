import Joi from 'joi';

export const registerValidation = (data) => {
    const schema = Joi.object({

        // common validations
        username: Joi.string().alphanum().min(3).max(40).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5).required(),
        telephone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        name: Joi.string().required(),
        roll: Joi.string().valid('startup', 'existing', 'distributor', 'consultant').required(),

        // startup validations
        nic: Joi.when('roll', { is: 'startup', then: Joi.string().min(10).max(12).required() }),

        // existing validations
        category: Joi.when('roll', { is: 'existing', then: Joi.string().required() }),
        businessName: Joi.when('roll', { is: 'existing', then: Joi.string().max(40).required() }),
        regNo: Joi.when('roll', { is: 'existing', then: Joi.string().min(6).max(20).required() }),
        address: Joi.when('roll', { is: 'existing', then: Joi.string().max(128).required() }),

        // consultant validations
        qualification: Joi.when('roll', { is: 'consultant', then: Joi.string().min(5).max(128).required() }),
        consultationFee: Joi.when('roll', { is: 'consultant', then: Joi.number().precision(2).positive().max(10000).required() }),

        // distributor validations
        driveLicNo: Joi.when('roll', { is: 'distributor', then: Joi.string().min(10).max(40).required() }),
        vehicleType: Joi.when('roll', { is: 'distributor', then: Joi.string().required() }),
        vehicleNo: Joi.when('roll', { is: 'distributor', then: Joi.string().required() }),

    });

    return schema.validate(data);

};
