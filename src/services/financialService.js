import dayjs from "dayjs";
import NotFound from "../errors/NotFound.js";
import Unauthorized from "../errors/Unauthorized.js";
import * as financialRepository from '../repositories/financialRepository.js'

const verifyToken = async (req) => {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const user = await financialRepository.selectUserByToken(token);
    if(!user.rows.length) throw new Unauthorized('Please login with a valid user')
    return {...user, token}
}

const getTransactions = async (user) => {
    const result = await financialRepository.selectTransactionsByToken(user.token)
    if(!result.rows.length) return null;
    const transactions = result.rows;
    return transactions
}

const createTransaction = async (user, type, value, description, categoryId) => {
    const { userId } = user.rows[0];
    const date = dayjs().format('YYYY-MM-DD');
    const signalValue = (type === "income" ? value : value * -1)
    await financialRepository.insertTransaction(userId, signalValue, description, date, categoryId)
}

const handleEditTransaction = async ( id, value, description, categoryId, userId ) => {
   const result =  await financialRepository.updateTransaction(id, value, description, categoryId, userId)
   if(!result.rowCount) throw new NotFound('this transaction was not found')
   return result.rows
}

const handleDeleteTransaction = async ( id, userId ) => {
    const result = await financialRepository.deleteTransaction(id, userId)
    if(!result.rowCount) throw new NotFound('this transaction was not found')
    return result.rows
}

export {
    verifyToken,
    getTransactions,
    createTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
}
