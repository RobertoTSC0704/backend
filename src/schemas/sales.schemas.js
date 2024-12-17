import { z } from 'zod';

export const salesSchema = z.object({
  productName: z.string({
    required_error: 'El nombre del producto es requerido',
  }),
  price: z.number({
    required_error: 'El precio del producto es requerido',
  }).nonnegative('El precio debe ser un número no negativo'),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
  }).int('La cantidad debe ser un número entero').nonnegative('La cantidad debe ser un número no negativo'),
  user: z.string({
    required_error: 'El identificador del usuario es requerido',
  }).uuid('El identificador de usuario debe ser un UUID válido').optional(), // Se marca como opcional si el backend lo asigna automáticamente
}); // Fin de salesSchema
