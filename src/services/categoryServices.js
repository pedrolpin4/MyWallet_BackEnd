import * as categoryRepository from '../repositories/categoryRepositories.js'

const handleCategoriesByType = async (type) => {
    const isIncome = type === 'income' ? 't' : 'f';
    const categories = await categoryRepository.selectCategoriesByType(isIncome);
    return categories
}

const handleCategoryStatsByType = async (type, userId) => {
    const isIncome = type === 'income' ? 't' : 'f';
    const stats = await categoryRepository.selectCategoryStatsByType(isIncome, userId);
    return stats.rows.map(stat => ({
        ...stat,
        sum: Math.abs(Number(stat.sum)),
    }))
}

export {
    handleCategoriesByType,
    handleCategoryStatsByType,
}