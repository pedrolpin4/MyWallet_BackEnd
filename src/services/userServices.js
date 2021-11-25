import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import * as userRepositories from "../repositories/userRepository.js"

const verifyExistentUser = async (email) => {
    const existentUser = await userRepositories.selectAllUsers(email)

    if(existentUser.rowCount){
        return true       
    }

    return false
}

const createUser = async (name, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await userRepositories.insertSignUp(name, email, hashedPassword)
}

const verifyLogin = async (email) => {
    const result = await userRepositories.selectLoginUser(email);
    const user = result.rows[0];
    
    if(!user){
        return null
    }

    return user;
}

const verifyPassword = (password, hashedPassword) => {
    if(!bcrypt.compareSync(password, hashedPassword)){
        return false
    }

    return true
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