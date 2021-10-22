import Joi from "joi";
import dayjs from "dayjs";
import connection from "../database/database.js";

const getIncomesAndExpenses = async (req, res) => {
    console.log(req.headers);
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        const result = await connection.query(`
            SELECT transactions.* FROM sessions
            JOIN transactions
            ON sessions."userId" = transactions."userId"
            WHERE sessions.token = $1
            `, [token]);

        const transactions = result.rows;
        res.send(transactions);
    } catch(error){
        console.log(error);
        res.sendStatus(500)
    }
}

const cashFlow = {
    getIncomesAndExpenses,

}

export default cashFlow