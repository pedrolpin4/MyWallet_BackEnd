import * as categoryRepository from '../repositories/categoryRepositories.js'

const handleCategoriesByType = async (type) => {
    const isIncome = type === 'income' ? 't' : 'f';
    const categories = await categoryRepository.selectCategoriesByType(isIncome);
    return categories
}

export {
    handleCategoriesByType,
}