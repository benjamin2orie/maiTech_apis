

import express from 'express';
import { setupSwagger } from './utils/swagger';
import router from './routes/api_routes';
import cors from 'cors';
// import router from 'routes/router';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
}));

// Setup Swagger
setupSwagger(app);

// Set up routes
// setRoutes(app);
app.use('/api/v1', router);

export default app;