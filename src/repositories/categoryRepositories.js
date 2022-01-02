import connection from '../database/database.js'

const selectCategoriesByType = async (isIncome) => {
    const result = await connection.query('SELECT * FROM categories WHERE is_income = $1', [isIncome]);
    return result
}

export {
    selectCategoriesByType,
}