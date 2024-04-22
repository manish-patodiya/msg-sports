import express from 'express';
import apiRouter from './api/api.js';
import cors from 'cors';
const app = express();

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