import { Router } from 'express';
import { authRequired } from '../middlewares/ValidateToken.js';




import {
    getSales,
    createSale,
    getSale,
    deleteSale,
    editSale
} from '../controllers/sales.controllers.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { salesSchema} from '../schemas/sales.schemas.js';

const router = Router();

// Obtener todas las ventas
router.get('/sales', authRequired, getSales);

// Agregar una nueva venta
router.post('/sales', authRequired, validateSchema(salesSchema), createSale);

// Obtener una venta por ID
router.get('/sales/:id', authRequired, getSale);

// Eliminar una venta por ID
router.delete('/sales/:id', authRequired, deleteSale);

// Editar una venta por ID
router.put('/sales/:id', authRequired, validateSchema(salesSchema), editSale);

export default router;
