import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

//configuramos la lectura de las variables de entorno
//para configurar la URL de la conexión a la BD de Mong
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js';
//importamos los rutas para usuarios
import productRoutes from './routes/products.routes.js';
import { version } from 'os';

const app = express();
app.use(cors({
    origin:['http://localhost:5173',
        'http://localhost:4000',
        'http://localhost',
        process.env.BASE_URL_BACKEND,
        process.env.BASE_URL_FRONTEND

    ],
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(express.urlencoded({extended:false}));

//Indicar que el servidor usara el objeto rutas
app.use('/api/', authRoutes);
app.use('/api/', productRoutes)

app.get('/', (req, res) =>{
    res.json({
        mensaje: "Bienvenido al API REST de Productos",
        version: "1.0.0",
        rutasDisponibles: [
            {endpoint: "/api/register", metodo: "POST", descripcion: "Crea un nuevo"},
            {endpoint: "/api/login", metodo: "POST", descripcion: "Para iniciar sesión"}
        ]

    });
});
export default app;