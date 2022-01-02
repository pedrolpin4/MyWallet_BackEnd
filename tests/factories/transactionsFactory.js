import faker from 'faker';
import dayjs from 'dayjs';
import connection from '../../src/database/database.js';

const createTransaction = async (userId) => {
    const DBCategory = await connection.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [faker.name.jobArea()]);
    const DBDescription = faker.name.jobDescriptor();
    const DBDate = dayjs().format('YYYY-MM-DD');
    const transaction = await connection.query(`INSERT INTO transactions ("userId", description, value, date, category_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, [userId, DBDescription, 34, DBDate, DBCategory.rows[0].id]);
    return transaction.rows[0].id;
}

const deleteTransaction = async (transactionId) => {
    await connection.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
}

export {
    createTransaction,
    deleteTransaction,
}
