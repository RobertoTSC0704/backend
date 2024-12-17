import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Campo obligatorio
    },
    price: {
        type: String, // Tipo String (aunque podría ser mejor usar `Number`)
        default: "0.0", // Valor por defecto como string
        required: true, // Campo obligatorio
    },
    quantity: {
        type: Number, // Tipo String (puedes usar `Number` si es un número)
        default: "2023", // Valor por defecto como string
        required: true, // Campo obligatorio
   
}, 
});

export default mongoose.model("Sales", salesSchema);
