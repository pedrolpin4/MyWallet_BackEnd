import connection from '../database/database.js'

const selectUserByToken = async (token) => {
    const result = await connection.query(`
        SELECT * FROM sessions
        WHERE token = $1
    `, [token]);
    return result
};

const selectTransactionsByToken = async (token) => {
    const result = await connection.query(`
        SELECT transactions.* FROM sessions
        JOIN transactions
        ON sessions."userId" = transactions."userId"
        WHERE sessions.token = $1
    `, [token]);
    return result;
};

const insertTransaction = async (userId, signalValue, description, date, categoryId) => {
    const result = await connection.query(`
        INSERT INTO transactions ("userId", value, description, date, category_id)
        VALUES ($1, $2, $3, $4, $5)
    `,[userId, signalValue, description, date, categoryId]);
    return result;
};

export {
    selectUserByToken,
    selectTransactionsByToken,
    insertTransaction,
}
