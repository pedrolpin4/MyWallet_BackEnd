import express from "express";
import cors from "cors";
import userRouter from './routes/userRouter.js';
import financialRouter from './routes/financialRouter.js';
import categoryRouter from './routes/categoryRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/category', categoryRouter)
app.use(userRouter)
app.use(financialRouter)

export default app;
