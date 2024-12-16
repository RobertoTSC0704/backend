import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Campo obligatorio
    },
    quantity: {
        type: Number, // Tipo Number para cantidades
        default: 1, // Valor por defecto
        required: true, // Campo obligatorio
    },
    total: {
        type: Number, // Tipo Number para el total
        required: true, // Campo obligatorio
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referencia a un documento en otra colección
        ref: "User", // Indica la colección referenciada
        required: true, // Campo obligatorio
    },
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default mongoose.model("Sales", salesSchema);