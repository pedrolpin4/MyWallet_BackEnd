import express from "express";
import cors from "cors";
import userRegistration from "./controllers/userRegistration.js";
import cashFlow from "./controllers/cashFlow.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => userRegistration.signUp(req, res));
app.post("/sign-in", (req, res) => userRegistration.signIn(req, res));

app.get("/cash-flow", (req, res) => cashFlow.getIncomesAndExpenses(req, res));
app.post("/incomes", (req, res) => cashFlow.postIncome(req, res));
app.post("/expenses", (req, res) => cashFlow.postExpense(req, res))

export default app