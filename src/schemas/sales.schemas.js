import { z } from 'zod';

export const salesSchema = z.object({
    quantity: z.number({
        required_error: 'La cantidad es requerida',
    }).positive('La cantidad debe ser mayor a 0'),
    total: z.number({
        required_error: 'El total de la venta es requerido',
    }).positive('El total debe ser mayor a 0'),
    date: z.string({
        required_error: 'La fecha de la venta es requerida',
    }).optional(), // Fecha opcional; si no está, se puede asignar automáticamente en el backend
}); // Fin de saleSchema
