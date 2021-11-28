import validations from "../validation/JoiValidations.js";
import * as financialServices from "../services/financialService.js"

const getIncomesAndExpenses = async (req, res) => {
    try {
        const user = await financialServices.verifyToken(req);

        if(!user){
            res.sendStatus(401);
            return;
        }
    
        const transactions = await financialServices.getTransactions(user);

        if(!transactions){
            res.sendStatus(204);
            return;
        }

        res.send(transactions); 
    } catch(error){
        res.sendStatus(500)
    }
}

const postTransation = async (req, res, type) => {
    const { value, description } = req.body;
    const IncomeValidation = validations.IncomesExpenses;

    if(IncomeValidation.validate(req.body).error){
        res.sendStatus(400)
        return;
    }

    try {
        const user = await financialServices.verifyToken(req);

        if(!user){
            res.sendStatus(401);
            return;
        }
        
        await financialServices.createTransaction(user, type, value, description);

        res.sendStatus(201);
        
    } catch (error){
        res.sendStatus(500)
    }
}

const postIncome = async (req,res) => {
    const result = await postTransation(req, res, "income");
    return result
}

const postExpense = async (req,res) => {
    const result = await postTransation(req, res, "expense")
    return result
}

export {
    getIncomesAndExpenses,
    postIncome,
    postExpense
}