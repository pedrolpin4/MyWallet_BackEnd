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
        SELECT transactions.*, categories.name as category FROM sessions
        JOIN transactions 
        ON sessions."userId" = transactions."userId"
        JOIN categories
        ON transactions.category_id = categories.id
        WHERE sessions.token = $1 ORDER BY id DESC
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

const updateTransaction = async (id, value, description, categoryId, userId) => {
    const result = await connection.query(`
        UPDATE transactions SET value = $1, description = $2, category_id = $3
        WHERE id = $4 AND "userId" = $5 RETURNING *;
    `,[value, description, categoryId, id, userId]);
    return result;
}

const deleteTransaction = async (id, userId) => {
    const result = await connection.query(`
        DELETE FROM transactions WHERE id = $1 AND "userId" = $2 RETURNING *;
    `,[id, userId]);
    return result;
}

export {
    selectUserByToken,
    selectTransactionsByToken,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
}
