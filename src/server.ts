
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './models/db_connection';
import express from 'express';
import { createServer } from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});