import mongoose from 'mongoose';

export const connectDB = async () =>{
    
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url)
            .then(()=>{
            console.log("Base de datos conectada");
        } )
        
        .catch ((err) =>{
        console.log(err)
    })

}//Fin de ConnectDB