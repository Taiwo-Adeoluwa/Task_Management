const joi = require('joi');

const createTaskSchema = joi.object({
    title: joi.string().required().messages({
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required'
    }),
    description: joi.string().required().messages({
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required'
    }),
    status: joi.string().valid('pending', 'in progress', 'completed').optional(),

    dueDate: joi.date().required().messages({
        'date.empty': 'Due date cannot be empty',
        'any.required': 'Due date is required'
    })
});

module.exports = { createTaskSchema };