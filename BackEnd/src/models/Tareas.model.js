import { DataTypes } from 'sequelize';
import sequelize from '../database/conexion.js';

/**
 * Modelo para las tareas
 * ORM -> Sequelize
 * para la tabla "tareas" en la base de datos
 */
const Tareas = sequelize.define('Tareas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    title: { type: DataTypes.STRING, allowNull: false },

    description: { type: DataTypes.TEXT, allowNull: false },

    status: { type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'), defaultValue: 'pendiente' },

    priority: { type: DataTypes.ENUM('1', '2', '3'), defaultValue: '3' },

    due_date: { type: DataTypes.DATE, allowNull: false }
    }, {
    tableName: 'tareas', timestamps: true
});

export default Tareas;