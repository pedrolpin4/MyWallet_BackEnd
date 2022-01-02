import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import Unauthorized from "../errors/Unauthorized.js"
import * as userRepositories from "../repositories/userRepository.js"
import ConflictError from '../errors/ConflictError.js'
import NotFound from '../errors/NotFound.js'

const verifyExistentUser = async (email) => {
    const existentUser = await userRepositories.selectAllUsers(email)
    if(existentUser.rowCount) throw new ConflictError()
}

const createUser = async (name, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await userRepositories.insertSignUp(name, email, hashedPassword)
}

const verifyLogin = async (email) => {
    const result = await userRepositories.selectLoginUser(email);
    const user = result.rows[0];
    if(!user) throw new NotFound()
    return user;
}

const verifyPassword = (password, hashedPassword) => {
    if(!bcrypt.compareSync(password, hashedPassword)) throw new Unauthorized()
}

const createToken = async (id) => {
    const token = uuid();
    await userRepositories.insertToken(id, token)
    return token
}

export {
    verifyExistentUser,
    createUser,
    verifyLogin,
    verifyPassword,
    createToken
}