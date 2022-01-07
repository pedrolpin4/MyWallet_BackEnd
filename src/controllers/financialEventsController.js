import validations from "../validation/JoiValidations.js";
import * as financialServices from "../services/financialService.js";
import ValidationError from '../errors/ValidationError.js';
import Unauthorized from "../errors/Unauthorized.js";
import NotFound from '../errors/NotFound.js'

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
    const TransactionValidation = validations.IncomesExpenses.validate(req.body).error;

    try {
        if(TransactionValidation) throw new ValidationError(TransactionValidation.details[0].message)
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

const editTransaction = async (req, res, next) => {
    const { value, description, categoryId } = req.body;
    const { type } = req.query;
    const { id } = req.params;
    const TransactionValidation = validations.IncomesExpenses.validate(req.body).error;

    try {
        if(TransactionValidation) throw new ValidationError(TransactionValidation.details[0].message);
        if( type !== 'expense' && type !== 'income') throw new ValidationError(
            'please use only  "expense" or "income" in the requisition query'
        );
        if(!Number(id)) throw new ValidationError('The id param must be a number')
        const user = await financialServices.verifyToken(req);
        await financialServices.handleEditTransaction( 
            id, 
            type === "expense" ? -value : value,
            description, 
            categoryId,
            user.rows[0].userId
        );
        return res.sendStatus(200);
    } catch (error){
        if(error instanceof ValidationError || error instanceof Unauthorized || error instanceof NotFound) {
            res.status(error.status).send(error.message);
        }
        return next(error);
    }
}

const deleteTransaction = async (req, res, next) => {
    const { id } = req.params;

    try {
        if(!Number(id)) throw new ValidationError('The id param must be a number')
        const user = await financialServices.verifyToken(req);
        await financialServices.handleDeleteTransaction(id, user.rows[0].userId);
        return res.sendStatus(200);
    } catch (error){
        if(error instanceof ValidationError || error instanceof Unauthorized || error instanceof NotFound) {
            res.status(error.status).send(error.message);
        }
        return next(error);
    }
}

export {
    getIncomesAndExpenses,
    postIncome,
    postExpense,
    editTransaction,
    deleteTransaction
}
