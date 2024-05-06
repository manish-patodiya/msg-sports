import express from 'express';
import apiRouter from './api/api.js';
import cors from 'cors';
const app = express();

app.use(express.static("public/uploads/"));
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE'
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