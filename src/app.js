import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// configuramos la lectura de las variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importamos las rutas para usuarios, productos y ventas
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import salesRoutes from './routes/sales.routes.js';

const app = express();

// Configuración de CORS para permitir peticiones desde diferentes orígenes
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4000',
        'http://localhost',
        process.env.BASE_URL_BACKEND,
        process.env.BASE_URL_FRONTEND
    ],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Configuración de las rutas de la API
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', salesRoutes);

// Endpoint raíz para mostrar mensaje de bienvenida y rutas disponibles
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: "Bienvenido al API REST de Productos",
        version: "1.0.0",
        rutasDisponibles: [
            { endpoint: "/api/register", metodo: "POST", descripcion: "Crea un nuevo usuario" },
            { endpoint: "/api/login", metodo: "POST", descripcion: "Inicia sesión" },
            { endpoint: "/api/products", metodo: "GET", descripcion: "Obtiene la lista de productos" },
            { endpoint: "/api/sales", metodo: "POST", descripcion: "Registra una nueva venta" }
        ]
    });
});

// Manejo de errores 404 (si alguna ruta no existe)
app.use((req, res, next) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        message: `No se encuentra el endpoint: ${req.originalUrl}`
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Error en el servidor",
        message: err.message || 'Ocurrió un error inesperado'
    });
});

export default app;
