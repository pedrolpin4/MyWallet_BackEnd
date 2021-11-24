import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import * as financialController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => userController.signUp(req, res));
app.post("/sign-in", (req, res) => userController.signIn(req, res));

app.get("/cash-flow", (req, res) => financialController.getIncomesAndExpenses(req, res));
app.post("/incomes", (req, res) => financialController.postIncome(req, res));
app.post("/expenses", (req, res) => financialController.postExpense(req, res));

export default app