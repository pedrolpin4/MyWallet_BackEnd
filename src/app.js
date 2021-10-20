import pg from "pg";
import express from "express";
import cors from "cors";
import userRegistration from "./components/userRegistration.js";
import cashFlow from "./components/cashFlow.js";

const app = express();
const { Pool } = pg;
app.use(cors());
app.use(express.json());

const connection = new Pool ({ 
    user: 'pedrolpin4',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'mywallet'
});

app.post("/sign-up", (req, res) => userRegistration.signUp(req, res, connection));

app.post("/sign-in", (req, res) => userRegistration.signIn(req, res, connection));

app.get("/cashFlow", (req, res) => cashFlow.getIncomesAndExpenses(req, res, connection));

app.post("/incomes", (req, res) => cashFlow.postIncome(req, res, connection));

app.post("/expenses", (req, res) => cashFlow.postExpense(req, res, connection))

app.listen(4000, () => console.log(`server running on port 4000`));