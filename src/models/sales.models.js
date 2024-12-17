import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Nombre del producto es obligatorio
    },
    price: {
        type: Number, // Usar `Number` para valores numéricos
        default: 0.0, // Valor por defecto
        required: true, // Precio es obligatorio
    },
    quantity: {
        type: Number, // Usar `Number` para cantidades
        default: 1, // Cantidad por defecto
        required: true, // Cantidad es obligatoria
    },
    image: {
        type: String, // Ruta de la imagen
        required: true, // La imagen es obligatoria
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al usuario
        ref: "User", // Colección referenciada
        required: true, // Usuario es obligatorio
    },
    createdAt: {
        type: Date,
        default: Date.now, // Fecha de creación por defecto
    },
});

export default mongoose.model("Sales", salesSchema);
