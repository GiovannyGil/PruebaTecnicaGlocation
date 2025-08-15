import tareaSchema from "../models/Tareas.schema.js";
import Tareas from '../models/Tareas.model.js';

/**
 * Metodo para crear una nueva tarea
 * @param {*} req  - Objeto de solicitud -> contiene los datos de la nueva tarea
 * @param {*} res - Objeto de respuesta -> Respuesta con la tarea creada o un error
 * @returns 
 */
export const crearTarea = async (req, res) => {
    try {
        // Validar los datos de entrada, verificando si todo es correcto o existe un error
        const { error } = tareaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // Crear la nueva tarea en la base de datos
        const nuevaTarea = await Tareas.create(req.body);
        if(!nuevaTarea){
            return res.status(500).json({ error: 'Error al crear tarea' });
        }
        // Enviar la tarea creada como respuesta
        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
}

/**
 * Metodo para obtener todas las tareas
 * @param {*} req  - Objeto de solicitud -> retorna la lista de tareas
 * @param {*} res - Objeto de respuesta -> Respuesta con la lista de tareas o un error
 * @returns 
 */
export const obtenerTareas = async (req, res) => {
    try {
        // Obtener todas las tareas de la base de datos
        const tareas = await Tareas.findAll();
        if (!tareas || tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas' });
        }
        // Enviar la lista de tareas como respuesta
        res.json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
};

/**
 * Metodo para obtener una tarea por ID
 * @param {*} req  - Objeto de solicitud
 * @param {*} res - Objeto de respuesta ->  Respuesta con la tarea encontrada o un error
 * @returns 
 */
export const obtenerTareaPorId = async (req, res) => {
    try {
        // Obtener la tarea por ID
        const tarea = await Tareas.findByPk(req.params.id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        // Enviar la tarea encontrada como respuesta
        res.json(tarea);
    } catch (error) {
        console.error('Error al obtener tarea por ID:', error);
        res.status(500).json({ error: 'Error al obtener tarea por ID' });
    }
}

/**
 * Metodo para actualizar una tarea
 * @param {*} req  - Objeto de solicitud -> contiene los datos de la tarea a actualizar
 * @param {*} res - Objeto de respuesta -> Respuesta con la tarea actualizada o un error
 * @returns 
 */
export const actualizarTarea = async (req, res) => {
    try {
        // Validar los datos de entrada, verificando si todo es correcto o existe un error
        const { error } = tareaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // Buscar la tarea por ID
        const tarea = await Tareas.findByPk(req.params.id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        // Actualizar la tarea con los nuevos datos
        await tarea.update(req.body);
        res.json(tarea);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
}

/**
 * Metodo para eliminar una tarea
 * @param {*} req  - Objeto de solicitud -> contiene el ID de la tarea a eliminar
 * @param {*} res - Objeto de respuesta -> Respuesta con la tarea eliminada o un error
 * @returns 
 */
export const eliminarTarea = async (req, res) => {
    try {
        // Buscar la tarea por ID
        const tarea = await Tareas.findByPk(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        // Eliminar la tarea
        await tarea.destroy();
        // envia mensaje de "confirmacion"
        res.status(204).send({
            message: 'Tarea eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
}