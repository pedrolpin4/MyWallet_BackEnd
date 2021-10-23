import dayjs from "dayjs";
import connection from "../database/database.js";
import validations from "../validation/JoiValidations.js";

const getIncomesAndExpenses = async (req, res) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    try {
        const user = await connection.query(`
            SELECT * FROM sessions
            WHERE token = $1
        `, [token]);

        if(!user.rows.length){
             res.sendStatus(401);
             return; 
        } 

        const result = await connection.query(`
            SELECT transactions.* FROM sessions
            JOIN transactions
            ON sessions."userId" = transactions."userId"
            WHERE sessions.token = $1
        `, [token]);

        if(!result.rows.length){
            res.sendStatus(204);
            return;   
        }

        const transactions = result.rows;
        res.send(transactions); 
    } catch(error){
        console.log(error);
        res.sendStatus(500)
    }
}

const postTransation = async (req, res, type) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');
    const { value, description } = req.body;
    const IncomeValidation = validations.IncomesExpenses;

    if(IncomeValidation.validate(req.body).error){
        res.sendStatus(400)
        return;
    }

    try {
        const user = await connection.query(`
            SELECT * FROM sessions
            WHERE token = $1
        `, [token]);
        
        console.log(`rows: ${JSON.stringify(user.rows[0])}`, `token: ${token}`);
        if(!user.rows.length){
            res.sendStatus(401);
            return; 
        }
        
        const userId = user.rows[0].userId;
        const date = dayjs().format('YYYY-MM-DD');
        const signalValue = (type === "income" ? value : value * -1)
        console.log(signalValue);

        await connection.query(`
            INSERT INTO transactions ("userId", value, description, date)
            VALUES ($1, $2, $3, $4)
        `,[userId, signalValue, description, date]);

        res.sendStatus(201);
        
    } catch (error){
        console.log(error);
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

const cashFlow = {
    getIncomesAndExpenses,
    postIncome,
    postExpense
}

export default cashFlow