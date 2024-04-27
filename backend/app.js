import express from 'express';
import apiRouter from './api/api.js';
import cors from 'cors';
import path from 'path';
const app = express();

app.use(express.static("public/data/uploads/"));
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use("/api", apiRouter);

app.listen(8000, () => {
    console.log("Server starting...")
});  