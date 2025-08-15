import Express from "express"
import cors from "cors"
import morgan from "morgan"

// inicair express
const app = Express()

//midleware
app.use(morgan('dev')) // para que express pueda entender las peticiones
app.use(Express.json()) // para que express pueda entender json
app.use(Express.urlencoded({ extended: true })) // para que express pueda entender formularios

// Configura CORS para permitir cookies desde el frontend
app.use(cors({
    origin: '*', // url FrontEnd (react + vite)
    credentials: true
}));

// rutas
import ruta from "./src/routes.js"
app.use('/api', ruta)
// condiciones de la ruta equivocada -> dar info de cual es la ruta correcta
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada, la ruta a la que debe ingresar es: http:// 192.168.18.127:3000/api' })
})


// definir puerto
const PORT = 3000
app.set('port', PORT)

// conexion base de datos
import { initializeDatabase } from './src/database/conexion.js'
initializeDatabase()


// configuracion del puerto y servidor
app.listen(app.get('port'))

// mensaje de inicio
console.log(`\x1b[36mServidor corriendo en el puerto ${app.get('port')} y servidor local http:// 192.168.18.127:${app.get('port')}`)

// exportar app
export default app