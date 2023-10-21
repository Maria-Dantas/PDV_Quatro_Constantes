const joi = require('joi');

const clientesSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório.',
        'string.empty': 'O campo e-mail é obrigatório.',
        'string.email': 'O campo e-mail precisa ter um e-mail válido.'
    }),

    cpf: joi.string().length(11).required().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório e requer um número inteiro.',
        'string.length': 'O campo cpf tem que ter 11 caracteres.',
        'string.base': 'O campo cpf tem que ser um texto.'

    }),

    cep: joi.number().integer().required().positive().messages({
        'any.required': 'O campo cep é obrigatório.',
        'number.base': 'O campo cep é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo cep é obrigatório e requer um número inteiro.',
        'number.positive': 'O campo cep é obrigatório e requer um número inteiro positivo.'
    }),

    rua: joi.string().required().messages({
        'any.required': 'O campo rua é obrigatório.',
        'string.empty': 'O campo rua é obrigatório.',
        'string.rua': 'O campo rua precisa ter um nome válido.'
    }),

    numero: joi.number().integer().required().positive().messages({
        'any.required': 'O campo numero é obrigatório.',
        'number.base': 'O campo numero é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo mumero é obrigatório e requer um número inteiro.',
        'number.positive': 'O campo numero é obrigatório e requer um número inteiro positivo.'
    }),

    bairro: joi.string().required().messages({
        'any.required': 'O campo bairro é obrigatório.',
        'string.empty': 'O campo bairro é obrigatório.',
        'string.rua': 'O campo bairro precisa ter um nome válido.'
    }),

    cidade: joi.string().required().messages({
        'any.required': 'O campo cidade é obrigatório.',
        'string.empty': 'O campo cidade é obrigatório.',
        'string.rua': 'O campo cidade precisa ter um nome válido.'
    }),

    estado: joi.string().length(2).required().messages({
        'any.required': 'O campo estado é obrigatório.',
        'string.empty': 'O campo estado é obrigatório.',
        'string.length': 'O campo estado tem que ter 2 caracteres.',
        'string.base': 'O campo estado tem que ser um texto.'
    }),

});


module.exports = clientesSchema;