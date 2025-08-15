import { useEffect } from "react";
import { createTarea, getTareaById, updateTarea } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './Form.css';
import Swal from "sweetalert2";

/**
 * Validación del formulario de tareas
 */
const schema = yup.object().shape({
    title: yup.string()
        .min(3, "Mínimo 3 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("Título requerido"),
    description: yup.string()
        .min(5, "Mínimo 5 caracteres")
        .max(500, "Máximo 500 caracteres")
        .required("Descripción requerida"),
    status: yup.string()
        .oneOf(["pendiente", "en_progreso", "completada"], "Estado inválido"),
    priority: yup.string()
        .oneOf(["1", "2", "3"], "Prioridad inválida"),
    due_date: yup.date()
        .min(new Date(), "La fecha debe ser mayor a hoy")
        .required("Fecha requerida"),
});

function TaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    /**
     * Configuración del formulario
     */
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            status: "pendiente",
            priority: "3",
            due_date: new Date()
        }
    });

    /**
     * Carga los datos de la tarea si se está editando
     */
    useEffect(() => {
        if (id) {
            getTareaById(id).then((data: { title: string; description: any; status: any; priority: any; due_date: { split: (arg0: string) => Date[]; }; }) => {
                setValue("title", data.title);
                setValue("description", data.description || "");
                setValue("status", data.status || "pendiente");
                setValue("priority", data.priority || "3");
                setValue("due_date", data.due_date && typeof data.due_date === "string" ? new Date(data.due_date) : new Date());
            });
        }
    }, [id, setValue]);


    /**
     * Maneja el envío del formulario
     * @param formData Datos del formulario
     * maneja una alerta de confirmación antes de enviar los datos
     * @returns retorna una promesa que se resuelve al enviar los datos
     */
    const onSubmit = async (formData: any) => {
        Swal.fire({
            title: id ? "¿Actualizar tarea?" : "¿Guardar nueva tarea?",
            text: id ? "Se actualizarán los datos de esta tarea." : "Se creará una nueva tarea.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: id ? "Sí, actualizar" : "Sí, guardar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (id) {
                        await updateTarea(id, formData);
                        Swal.fire("Actualizado", "La tarea ha sido actualizada correctamente.", "success");
                    } else {
                        await createTarea(formData);
                        Swal.fire("Guardado", "La tarea ha sido creada correctamente.", "success");
                    }
                    navigate("/");
                } catch (error) {
                    console.error("Error al guardar tarea:", error);
                    Swal.fire("Error", "Ocurrió un error al guardar la tarea.", "error");
                }
            }
        });
    };

    /**
     * Renderiza el formulario de tarea
     * dependiendo de si se está editando o creando una nueva tarea
     */
    return (
        <div className="form-container">
            <h2 className="form-title">{id ? "Editar Tarea" : "Agregar Tarea"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Título:</label>
                <input {...register("title")} />
                {errors.title && <p className="error">{errors.title.message}</p>}

                <label>Descripción:</label>
                <textarea {...register("description")} />
                {errors.description && <p className="error">{errors.description.message}</p>}

                <label>Estado:</label>
                <select {...register("status")}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                </select>
                {errors.status && <p className="error">{errors.status.message}</p>}

                <label>Prioridad:</label>
                <select {...register("priority")}>
                    <option value="1">Alta</option>
                    <option value="2">Media</option>
                    <option value="3">Baja</option>
                </select>
                {errors.priority && <p className="error">{errors.priority.message}</p>}

                <label>Fecha límite:</label>
                <input type="date" {...register("due_date")} />
                {errors.due_date && <p className="error">{errors.due_date.message}</p>}

                <button type="submit">{id ? "Actualizar" : "Crear"}</button>
                <button type="button" onClick={() => navigate("/tasks")}>Cancelar</button>
            </form>
        </div>
    );
}

export default TaskForm;
