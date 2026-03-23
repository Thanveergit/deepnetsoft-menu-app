import mongoose from "mongoose";


const connectDB = async ():Promise<void>=>{
     try {
          const uri = process.env.MONGODB_URI
          if (!uri){
               throw new Error('MONGODB_URI is not defined in .env file')
          }

          const conn = await mongoose.connect(uri)
          console.log(`Mongo atlas connected,${conn.connection.host}`)

          mongoose.connection.on('disconnected',()=>{
               console.warn('Mongoose disconnected')
          })
          mongoose.connection.on('error',(error)=>{
               console.error('MongoDB error:',error)
          })
     } catch (error) {
          if(error instanceof Error){
               console.error('MongoDB connection failed',error.message);
          }
          process.exit(1)
     }
}

export default connectDB