import Express from "express"
import {
    crearTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizarTarea,
    eliminarTarea
} from "./services/Tarea.services.js"

// inicair express
const ruta = Express()

/**
 * Rutas para la gestión de tareas
 * con todos los metodos http necesarios y sus funciones
 */
ruta.post('/tasks', crearTarea)
ruta.get('/tasks', obtenerTareas)
ruta.get('/tasks/:id', obtenerTareaPorId)
ruta.put('/tasks/:id', actualizarTarea)
ruta.delete('/tasks/:id', eliminarTarea)
// url por defecto
ruta.get('/', (req, res) => {
    res.send(
        'Bienvenido!\n' +
        'Las rutas para acceder a los datos son:\n' +
        '/tasks : CRUD tareas '
    )
})

export default ruta