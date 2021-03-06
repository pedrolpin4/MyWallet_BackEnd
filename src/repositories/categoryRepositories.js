import connection from '../database/database.js'

const selectCategoriesByType = async (isIncome) => {
    const result = await connection.query('SELECT * FROM categories WHERE is_income = $1', [isIncome]);
    return result
}

const selectCategoryStatsByType = async (isIncome, userId) => {
    const result = await connection.query(`
        SELECT SUM(transactions.value),  categories.* FROM categories
        JOIN transactions ON categories.id = transactions.category_id 
        WHERE is_income = $1 AND transactions."userId" = $2 GROUP BY categories.id
    `, [isIncome, userId]);
    return result
}

export {
    selectCategoriesByType,
    selectCategoryStatsByType,
}