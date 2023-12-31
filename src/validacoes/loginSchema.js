const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório.',
        'string.empty': 'O campo e-mail é obrigatório.',
        'string.email': 'O campo e-mail precisa ter um e-mail válido.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.'
    })
});

module.exports = loginSchema;