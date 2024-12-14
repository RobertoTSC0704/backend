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

const app = express();
app.use(cors({
    origin:['http://localhost:5173','http://localhost:4000'],
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

export default app;