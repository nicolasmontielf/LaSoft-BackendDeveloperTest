import mongoose from "mongoose";

const main = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Conexión a la base de datos")
    } catch (error) {
        console.error("No se pudo conectar", error.message);
        console.error("El error", error)
        console.log("URL", process.env.DATABASE_URI)
    }
   
}

export default main;