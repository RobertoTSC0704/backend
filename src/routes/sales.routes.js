import { Router } from 'express';
import { authRequired } from '../middlewares/ValidateToken.js';
import {
    getSales,
    createSale,
    getSale,
    deleteSale,
    updateSale,
} from '../controllers/sales.controllers.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { saleSchema } from '../schemas/sale.schemas.js'; // Esquema para validar las ventas
import { uploadImage } from '../middlewares/uploadImage.middleware.js';

const router = Router();

// Obtener todas las ventas
router.get('/sales', authRequired, getSales);

// Crear una venta
router.post('/sales', authRequired, uploadImage, validateSchema(saleSchema), createSale);

// Obtener una venta por ID
router.get('/sales/:id', authRequired, getSale);

// Eliminar una venta por ID
router.delete('/sales/:id', authRequired, deleteSale);

// Actualizar una venta por ID
router.put('/sales/:id', authRequired, uploadImage, validateSchema(saleSchema), updateSale);

export default router;
