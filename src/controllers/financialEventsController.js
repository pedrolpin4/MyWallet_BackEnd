import validations from "../validation/JoiValidations.js";
import * as financialServices from "../services/financialService.js";
import ValidationError from '../errors/ValidationError.js';
import Unauthorized from "../errors/Unauthorized.js";

const getIncomesAndExpenses = async (req, res, next) => {
    try {
        const user = await financialServices.verifyToken(req);
        const transactions = await financialServices.getTransactions(user);
        if(!transactions) return res.sendStatus(204);
        return res.send(transactions); 
    } catch(error){
        if(error instanceof Unauthorized) {
            res.status(error.status).send(error.message);
        }
        return next(error)
    }
}

const postTransation = async (req, res, next, type) => {
    const { value, description, categoryId } = req.body;
    const IncomeValidation = validations.IncomesExpenses.validate(req.body).error;

    try {
        if(IncomeValidation) throw new ValidationError(IncomeValidation.details[0].message)
        const user = await financialServices.verifyToken(req);
        await financialServices.createTransaction(user, type, value, description, categoryId);
        return res.sendStatus(201);
    } catch (error){
        if(error instanceof ValidationError || error instanceof Unauthorized) {
            res.status(error.status).send(error.message);
        }
        return next(error);
    }
}

const postIncome = async (req, res, next) => {
    const result = await postTransation(req, res, next, "income");
    return result
}

const postExpense = async (req, res, next) => {
    const result = await postTransation(req, res, next, "expense")
    return result
}

export {
    getIncomesAndExpenses,
    postIncome,
    postExpense
}
