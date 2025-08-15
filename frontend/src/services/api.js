// src/services/api.js
import axios from "axios";

/**
 * Configuración de la API
 * llamado al backend
 */
const api = axios.create({
    baseURL: "http://localhost:3000/api/", // URL de tu backend
});

/**
 * Obtiene la lista de tareas
 * @returns {Promise<Tarea[]>} Lista de tareas
 */
export const getTareas = async () => {
    const res = await api.get("/tasks");
    console.log('DATOS ', res.data);
    return res.data;
};

/**
 * Obtiene una tarea por su ID
 * @param {number} id ID de la tarea a obtener
 * @returns {Promise<Tarea>} Tarea encontrada
 */
export const getTareaById = async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
};

/**
 * Crea una nueva tarea
 * @param {Tarea} data Datos de la tarea a crear
 * @returns {Promise<Tarea>} Tarea creada
 */
export const createTarea = async (data) => {
    const res = await api.post("/tasks", data);
    return res.data;
};

/**
 * Actualiza una tarea existente
 * @param {number} id ID de la tarea a actualizar
 * @param {Tarea} data Datos de la tarea a actualizar
 * @returns {Promise<Tarea>} Tarea actualizada
 */
export const updateTarea = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
};

/**
 * Elimina una tarea por su ID
 * @param {number} id ID de la tarea a eliminar
 * @returns {Promise<void>}
 */
export const deleteTarea = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};
