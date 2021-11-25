import dayjs from "dayjs";
import connection from "../database/database.js";

const verifyToken = async (req) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    const user = await connection.query(`
        SELECT * FROM sessions
        WHERE token = $1
    `, [token]);

    if(!user.rows.length){
            return null
    } 

    return {
        ...user,
        token,
    }

}

const getTransactions = async (user) => {
    const result = await connection.query(`
        SELECT transactions.* FROM sessions
        JOIN transactions
        ON sessions."userId" = transactions."userId"
        WHERE sessions.token = $1
    `, [user.token]);

    if(!result.rows.length){
        return null;
    }

    const transactions = result.rows;
    return transactions
}


const createTransaction = async (user, type, value, description) => {
    const userId = user.rows[0].userId;
    const date = dayjs().format('YYYY-MM-DD');
    const signalValue = (type === "income" ? value : value * -1)

    await connection.query(`
        INSERT INTO transactions ("userId", value, description, date)
        VALUES ($1, $2, $3, $4)
    `,[userId, signalValue, description, date]);
}

export {
    verifyToken,
    getTransactions,
    createTransaction,
}