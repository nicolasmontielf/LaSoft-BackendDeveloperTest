import mongoose from "mongoose";

const main = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("The connection with the database was successfully!")
    } catch (error) {
        console.error("Error connecting with database", error.message);
        console.error("The Error", error)
        console.log("URL", process.env.DATABASE_URI)
    }
   
}

export default main;