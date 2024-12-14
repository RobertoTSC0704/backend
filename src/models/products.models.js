import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Campo obligatorio
    },
    price: {
        type: String, // Tipo String (aunque podría ser mejor usar `Number`)
        default: "0.0", // Valor por defecto como string
        required: true, // Campo obligatorio
    },
    year: {
        type: String, // Tipo String (puedes usar `Number` si es un número)
        default: "2023", // Valor por defecto como string
        required: true, // Campo obligatorio
    },
    image: {
        type: String, // Corrección: `type` 
        required: true, // Campo obligatorio
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referencia a un documento en otra colección
        ref: "User", // Indica la colección referenciada
        required: true, // Campo obligatorio
    },
});

export default mongoose.model("Products", productsSchema);
