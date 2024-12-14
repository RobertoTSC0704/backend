import { Router } from 'express';
import { login, register, logout,profile,verifyToken} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/ValidateToken.js';
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema,loginSchema} from '../schemas/auth.schemas.js'

const router = Router();
router.get('/verify', verifyToken);
//Ruta para registrar Ususarios
router.post('/register',validateSchema(registerSchema), register);

//Ruta para Iniciar Sesión
router.post('/login',validateSchema(loginSchema), login);

//Ruta para Cerrar Sesión
router.post('/logout', logout);

//Ruta para Perfil del Usuario
router.get('/profile', authRequired, profile);

export default router;