// src/components/TaskList.jsx
import { useEffect, useState, type SetStateAction } from "react";
import { getTareas, deleteTarea } from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css';

/**
 * Tipo que representa una tarea
 */
type Tarea = {
    id: number;
    title: string;
    description?: string;
    status?: string;
    due_date?: string;
};


function TaskList() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const navigate = useNavigate();

    /**
     * Carga las tareas desde la API
     */
    const cargarTareas = () => {
        getTareas()
            .then((data: SetStateAction<Tarea[]>) => setTareas(data))
            .catch((error: any) => console.error("Error al obtener tareas:", error));
    };

    /**
     * Efecto que carga las tareas al montar el componente
     */
    useEffect(() => {
        cargarTareas();
    }, []);

    /**
     * Maneja la eliminación de una tarea
     * @param id ID de la tarea a eliminar
     * maneja la alerta de confirmación antes de eliminar la tarea
     */
    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#95a5a6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteTarea(id);
                    cargarTareas();
                    Swal.fire({
                        title: "Eliminada",
                        text: "La tarea ha sido eliminada.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar la tarea", "error");
                }
            }
        });
    };

    /**
     * Renderiza la lista de tareas
     * dependiendo de si hay tareas disponibles
     */
    return (
        <div className="container">
            <div className="header">
                <h1 className="main-title">Lista de Tareas</h1>
                <button className="btn-add" onClick={() => navigate("/task/new")}>
                    Agregar Tarea
                </button>
            </div>

            <div className="table-wrapper">
                {tareas.length > 0 ? (
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Fecha límite</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareas.map(tarea => (
                                <tr key={tarea.id}>
                                    <td>{tarea.id}</td>
                                    <td>{tarea.title}</td>
                                    <td>{tarea.description || '-'}</td>
                                    <td>
                                        {tarea.status ? (
                                            <span className={`task-status status-${tarea.status.toLowerCase()}`}>{tarea.status}</span>
                                        ) : '-'}
                                    </td>
                                    <td>{tarea.due_date ? new Date(tarea.due_date).toLocaleDateString() : '-'}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => navigate(`/task/${tarea.id}`)}>Editar</button>
                                        <button className="btn-delete" onClick={() => handleDelete(tarea.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-tasks">No hay tareas disponibles</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
