import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import itemsRoute from './routes/itemsRoute';
import menusRoute from './routes/menusRoute';

dotenv.config();

const app = express();

// Better CORS configuration
const allowedOrigins = [
  'http://localhost:5173',     
  'http://localhost:3000',     
  process.env.CLIENT_URL       
].filter(Boolean); 

const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/menus', menusRoute);
app.use('/api/items', itemsRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = Number(process.env.PORT) || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`CORS enabled for origins:`, allowedOrigins);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});