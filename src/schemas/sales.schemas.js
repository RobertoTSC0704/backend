import { z } from 'zod';

// Esquema para validar las ventas
export const salesSchema = z.object({
  productName: z.string({
    required_error: 'El nombre del producto es requerido',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
  }).nonnegative('El precio debe ser un número positivo'),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
  }).int('La cantidad debe ser un número entero').nonnegative('La cantidad no puede ser negativa'),
  user: z.string({
    required_error: 'El identificador del usuario es requerido',
  }).optional(), // Este campo es opcional
});
