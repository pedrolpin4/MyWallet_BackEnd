import ValidationError from '../errors/ValidationError.js';
import * as categoryServices from '../services/categoryServices.js'

const getCategoriesByType = async (req, res, next) => {
    const { type } = req.query;
    try {
        if( type !== 'expense' && type !== 'income') throw new ValidationError(
            'please use only  "expense" or "income" in the requisition query'
        );
        const categories = await categoryServices.handleCategoriesByType(type);
        return res.send(categories.rows);
    } catch (error) {
        if(error instanceof ValidationError) {
            return res.status(error.status).send(error.message);
        }
        return next(error)
    }
}



const getCategoryStatsByType =  async (req, res, next) => {
    const { type } = req.query;
    try {
        if( type !== 'expense' && type !== 'income') throw new ValidationError(
            'please use only  "expense" or "income" in the requisition query'
        );
        const stats = await categoryServices.handleCategoryStatsByType(type);
        return res.send(stats);
    } catch (error) {
        if(error instanceof ValidationError) {
            return res.status(error.status).send(error.message);
        }
        return next(error)
    }
}

export {
    getCategoriesByType,
    getCategoryStatsByType,
}
