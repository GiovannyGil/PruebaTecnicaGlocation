import Joi from 'joi';

/**
 * Esquema de validación para las tareas
 * Utiliza Joi para definir las reglas de validación
 */
const tareaSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    status: Joi.string().valid('pendiente', 'en_progreso', 'completada').default('pendiente'),
    priority: Joi.string().valid('1', '2', '3').default('3'),
    due_date: Joi.date().greater('now').required()
});

export default tareaSchema;
