const joi = require('joi');

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição é obrigatório.'
    }),
    quantidade_estoque: joi.number().integer().required().positive().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'O campo quantidade_estoque é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo quantidade_estoque é obrigatório e requer um número inteiro.',
        'number.positive': 'O campo quantidade_estoque é obrigatório e requer um número inteiro positivo.'
    }),
    valor: joi.number().integer().required().positive().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'O campo valor é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo valor é obrigatório e requer um número inteiro.',
        'number.positive': 'O campo valor é obrigatório e requer um número inteiro positivo.'
    }),
    categoria_id: joi.number().integer().required().positive().min(1).max(9).messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'O campo categoria_id é obrigatório e requer um número inteiro.',
        'number.integer': 'O campo categoria_id é obrigatório e requer um número inteiro.',
        'number.positive': 'Não foi possível encontrar a categoria_id informada.',
        'number.min': 'Não foi possível encontrar a categoria_id informada.',
        'number.max': 'Não foi possível encontrar a categoria_id informada.',
    }),
    produto_imagem: joi.string().uri().optional().allow(null).messages({
        'string.uri': 'produto_imagem deve ser uma URL válida.',
        'string.empty': 'produto_imagem não pode ser um campo vazio.',
        'string.base': 'produto_imagem deve ser um campo do tipo string.'
      })
    
});

module.exports = produtoSchema;