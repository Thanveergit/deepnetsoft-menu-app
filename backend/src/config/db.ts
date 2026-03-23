import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file')
    }

    await mongoose.connect(uri)

    console.log(' MongoDB Atlas connected successfully')

    mongoose.connection.on('disconnected', () => {
      console.warn('  MongoDB disconnected')
    })

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err)
    })

  } catch (error) {
    if (error instanceof Error) {
      console.error(' MongoDB connection failed:', error.message)
    }
    process.exit(1)
  }
}

export default connectDB