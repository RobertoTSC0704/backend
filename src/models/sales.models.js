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
    price: {
        type: Number, // Tipo Number para el total
        required: true, // Campo obligatorio
    },
 
}, {
    
});

export default mongoose.model("Sales", salesSchema);
