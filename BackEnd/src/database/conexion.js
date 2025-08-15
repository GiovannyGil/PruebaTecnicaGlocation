import { Sequelize } from 'sequelize';

/**
 * Configuración de la base de datos
 * Conexión a SQLite
 * Crear base de datos
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Ruta del archivo de la base de datos
    logging: false, // Opcional: desactiva logs de SQL
});


/**
 * Función para conectar y sincronizar modelos
 * Asegura que todos los modelos estén registrados y sincronizados con la base de datos
 */
export async function initializeDatabase() {
    try {
        // Importar todos los modelos aquí para asegurar que se registren
        await import('../models/Tareas.model.js');

        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');

        await sequelize.sync({ alter: true });
        console.log('Sincronización de modelos exitosa - Tablas creadas/actualizadas');
    } catch (error) {
        console.error('Error al conectar o sincronizar:', error);
    }
}

export default sequelize;