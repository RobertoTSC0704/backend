import {Router} from 'express';
import { authRequired } from '../middlewares/ValidateToken.js';
import {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    editProduct} from '../controllers/products.controllers.js';
import { registerSchema ,loginSchema} from '../schemas/auth.schemas.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { productSchema } from '../schemas/product.schemas.js';
import { uploadImage } from '../middlewares/uploadImage.middleware.js';
const router = Router();

//Obtener todos los productos AF
router.get('/products', authRequired, getProducts);
//Agregar un producto 
router.post('/products', authRequired,uploadImage,validateSchema(productSchema), createProduct);
//Obtener un producto por id 
router.get('/products/:id', authRequired, getProduct);
//Eliminar un producto 
router.delete('/products/:id', authRequired, deleteProduct);
//Actualizar un producto 
router.put('/products/:id', authRequired,uploadImage,validateSchema(productSchema), editProduct);

export default router;