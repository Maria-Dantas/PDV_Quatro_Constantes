const joi = require('joi');

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório.',
        'string.empty': 'O campo e-mail é obrigatório.',
        'string.email': 'O campo e-mail precisa ter um e-mail válido.'
    }),
    cpf: joi.number().integer().required().positive().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'number.base': 'O campo cpf é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo cpf é obrigatório e requer um número inteiro.',
        'number.positive': 'O campo cpf é obrigatório e requer um número inteiro positivo.'
    })

});


module.exports = clienteSchema;