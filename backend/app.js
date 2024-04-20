import express from 'express';
import apiRouter from './api/api.js';
const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.listen(8000, () => {
    console.log("Server starting...")
});  